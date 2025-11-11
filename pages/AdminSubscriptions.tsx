
import React, { useState, useEffect } from 'react';
import { Subscription } from '../types';
import { getAllSubscriptions } from '../lib/api';
import Card from '../components/ui/Card';

const AdminSubscriptions: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const data = await getAllSubscriptions();
                setSubscriptions(data);
            } catch (error) {
                console.error("Failed to fetch subscriptions:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSubscriptions();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const statusBadge = (status: string) => {
        const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
        switch (status) {
            case 'active':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
            case 'expired':
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
            case 'cancelled':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
            default:
                return baseClasses;
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">All Subscriptions</h1>
            <Card>
                {isLoading ? (
                    <div className="text-center py-10">Loading subscriptions...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Plan</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Start Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">End Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {subscriptions.map((sub) => (
                                    <tr key={sub.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{sub.user?.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{sub.user?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{sub.plan?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={statusBadge(sub.status)}>
                                                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{formatDate(sub.startDate)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{formatDate(sub.endDate)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default AdminSubscriptions;
