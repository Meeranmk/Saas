
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';

interface AdminRouteProps {
  children: React.ReactElement;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // Or redirect to a "Not Authorized" page
    return <Navigate to="/dashboard" replace />;
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default AdminRoute;
