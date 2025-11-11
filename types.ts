
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  duration: number; // in days
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
  user?: User;
  plan?: Plan;
}
