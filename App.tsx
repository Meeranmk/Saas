
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Plans from './pages/Plans';
import Dashboard from './pages/Dashboard';
import AdminSubscriptions from './pages/AdminSubscriptions';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { useAuthStore } from './store/authStore';

function App() {
  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/plans" element={<ProtectedRoute><Plans /></ProtectedRoute>} />
          <Route 
            path="/admin/subscriptions" 
            element={
              <AdminRoute>
                <AdminSubscriptions />
              </AdminRoute>
            } 
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
