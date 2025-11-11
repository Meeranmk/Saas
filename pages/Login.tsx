
import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Login: React.FC = () => {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to log in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <svg className="mx-auto h-12 w-auto text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" isLoading={isLoading} fullWidth>
              Sign in
            </Button>
             <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Or log in as <a onClick={() => setEmail('admin@example.com')} className="font-medium text-primary-600 hover:text-primary-500 cursor-pointer">Admin</a>
            </p>
          </form>
        </Card>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Not a member?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                Register now
            </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
