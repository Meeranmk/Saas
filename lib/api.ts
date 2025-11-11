
import { User, Plan, Subscription, Role } from '../types';

// --- MOCK DATABASE ---
const users: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: Role.ADMIN },
  { id: '2', name: 'Test User', email: 'user@example.com', role: Role.USER },
];

const plans: Plan[] = [
  {
    id: 'plan_basic',
    name: 'Basic',
    price: 10,
    duration: 30,
    features: ['5 Projects', 'Basic Analytics', '24/7 Support'],
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    price: 25,
    duration: 30,
    features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'API Access'],
  },
  {
    id: 'plan_enterprise',
    name: 'Enterprise',
    price: 50,
    duration: 30,
    features: ['Everything in Pro', 'Dedicated Account Manager', 'Custom Integrations'],
  },
];

let subscriptions: Subscription[] = [
  {
    id: 'sub_1',
    userId: '1',
    planId: 'plan_pro',
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  },
];

// --- MOCK API FUNCTIONS ---

const simulateNetworkDelay = (delay = 500) => new Promise(res => setTimeout(res, delay));

export const login = async (credentials: { email: string, password?: string }) => {
  await simulateNetworkDelay();
  const user = users.find(u => u.email === credentials.email);
  if (!user) throw new Error('User not found');
  // In a real app, you'd verify the password
  return { user, token: `mock_jwt_for_${user.id}` };
};

export const register = async (userData: { name: string, email: string, password?: string }) => {
  await simulateNetworkDelay();
  if (users.some(u => u.email === userData.email)) throw new Error('User already exists');
  
  const newUser: User = {
    id: String(users.length + 1),
    name: userData.name,
    email: userData.email,
    role: Role.USER,
  };
  users.push(newUser);
  return { user: newUser, token: `mock_jwt_for_${newUser.id}` };
};

export const getPlans = async (): Promise<Plan[]> => {
  await simulateNetworkDelay();
  return plans;
};

export const getMySubscription = async (userId: string): Promise<Subscription | null> => {
  await simulateNetworkDelay();
  const sub = subscriptions.find(s => s.userId === userId && s.status === 'active');
  if (!sub) return null;
  
  const plan = plans.find(p => p.id === sub.planId);
  return { ...sub, plan };
};

export const getAllSubscriptions = async (): Promise<Subscription[]> => {
  await simulateNetworkDelay(1000);
  return subscriptions.map(sub => ({
    ...sub,
    user: users.find(u => u.id === sub.userId),
    plan: plans.find(p => p.id === sub.planId),
  }));
};

export const subscribeToPlan = async (userId: string, planId: string): Promise<Subscription> => {
  await simulateNetworkDelay();
  
  // Deactivate any existing subscription for the user
  subscriptions = subscriptions.map(s => s.userId === userId ? { ...s, status: 'cancelled' } : s);
  
  const plan = plans.find(p => p.id === planId);
  if (!plan) throw new Error('Plan not found');

  const now = new Date();
  const endDate = new Date(now);
  endDate.setDate(now.getDate() + plan.duration);

  const newSubscription: Subscription = {
    id: `sub_${Date.now()}`,
    userId,
    planId,
    startDate: now.toISOString(),
    endDate: endDate.toISOString(),
    status: 'active',
  };
  subscriptions.push(newSubscription);

  return { ...newSubscription, plan };
};
