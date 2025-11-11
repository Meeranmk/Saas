
import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <svg className="mx-auto h-12 w-auto text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Create a new account</h2>
        </div>
        <Card>
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
             {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" isLoading={isLoading} fullWidth>
              Register
            </Button>
          </form>
        </Card>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
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
