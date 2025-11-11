
import React, { useState, useEffect } from 'react';
import { Plan } from '../types';
import { getPlans, subscribeToPlan } from '../lib/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CheckIcon = () => (
    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);

const Plans: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [subscribingId, setSubscribingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await getPlans();
                setPlans(data);
            } catch (err) {
                setError('Failed to load plans.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const handleSubscribe = async (planId: string) => {
        if (!user) return;
        setSubscribingId(planId);
        try {
            await subscribeToPlan(user.id, planId);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to subscribe. Please try again.');
        } finally {
            setSubscribingId(null);
        }
    };

    if (isLoading) {
        return <div className="text-center p-10">Loading plans...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-500">{error}</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Select the perfect plan to fit your needs.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <Card key={plan.id} className={`flex flex-col transform hover:-translate-y-1 transition-transform duration-300 ${index === 1 ? 'border-2 border-primary-500' : ''}`}>
                         {index === 1 && <span className="absolute top-0 right-4 -mt-3 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>}
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">{plan.duration} days of access</p>
                        <div className="my-6">
                            <span className="text-5xl font-extrabold text-gray-900 dark:text-white">${plan.price}</span>
                            <span className="text-base font-medium text-gray-500 dark:text-gray-400">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-grow">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <CheckIcon />
                                    <span className="ml-3 text-gray-600 dark:text-gray-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button
                            onClick={() => handleSubscribe(plan.id)}
                            isLoading={subscribingId === plan.id}
                            fullWidth
                            variant={index === 1 ? 'primary' : 'secondary'}
                        >
                            {subscribingId === plan.id ? 'Subscribing...' : 'Choose Plan'}
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Plans;
