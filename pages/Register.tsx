import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Logo: React.FC<{ className?: string }> = ({ className = 'h-10 w-auto' }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 8V16H16V8H8Z"
        className="text-primary-500 fill-current opacity-75"
      />
      <path
        d="M6 6V18H18V6H6ZM8 8H16V16H8V8Z"
        className="text-primary-500 fill-current"
      />
    </svg>
  );

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to register.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
           <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            to start your journey with SaaSBoard
          </p>
        </div>
        <Card className="!p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="name"
              label="Full Name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <Button type="submit" isLoading={isLoading} fullWidth>
                Create Account
              </Button>
            </div>
          </form>
        </Card>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
            </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;