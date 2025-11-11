
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Subscription } from '../types';
import { getMySubscription } from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        
        const fetchSubscription = async () => {
            try {
                const data = await getMySubscription(user.id);
                setSubscription(data);
            } catch (error) {
                console.error("Failed to fetch subscription:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSubscription();
    }, [user]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const getDaysRemaining = (endDate: string) => {
        const end = new Date(endDate);
        const now = new Date();
        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };
    
    if (isLoading) {
        return <div className="text-center p-10">Loading dashboard...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}!</h1>
            {subscription ? (
                <Card>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Your Subscription</h2>
                            <p className="text-lg font-semibold text-primary-500">{subscription.plan?.name} Plan</p>
                        </div>
                        <div className="mt-4 md:mt-0 px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                           {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </div>
                    </div>
                    <div className="border-t dark:border-gray-700 my-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                            <p className="font-semibold text-lg">{formatDate(subscription.startDate)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">End Date</p>
                            <p className="font-semibold text-lg">{formatDate(subscription.endDate)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Days Remaining</p>
                            <p className="font-semibold text-lg">{getDaysRemaining(subscription.endDate)}</p>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <Link to="/plans">
                            <Button variant="secondary">Change Plan</Button>
                        </Link>
                    </div>
                </Card>
            ) : (
                <Card className="text-center">
                    <h2 className="text-2xl font-bold mb-4">No Active Subscription</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">You don't have an active subscription yet. Choose a plan to get started!</p>
                    <Link to="/plans">
                        <Button>View Plans</Button>
                    </Link>
                </Card>
            )}
        </div>
    );
};

export default Dashboard;
