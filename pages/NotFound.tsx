
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
            <h1 className="text-6xl font-extrabold text-primary-600">404</h1>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page Not Found</h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                Sorry, the page you are looking for does not exist.
            </p>
            <div className="mt-8">
                <Link to="/">
                    <Button>Go Back Home</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
