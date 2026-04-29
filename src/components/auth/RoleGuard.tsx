import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';

interface RoleGuardProps {
  requiredRole: 'customer' | 'admin';
  children?: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ requiredRole, children }) => {
  const { role, user, isAuthenticated } = useAuthStore();

  // ✅ Debug logging
  console.log('🔐 RoleGuard Check:', {
    requiredRole,
    userRole: role,
    isAuthenticated,
    userEmail: user?.email,
    hasAccess: role === requiredRole,
  });

  // ✅ Check authentication first
  if (!isAuthenticated) {
    console.warn('⛔ Not authenticated - redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // ✅ Check role
  if (role !== requiredRole) {
    console.warn('⛔ Access denied - redirecting to home', {
      required: requiredRole,
      actual: role,
    });
    return <Navigate to="/" replace />;
  }

  console.log('✅ Access granted to', requiredRole, 'routes');

  // ✅ Use Outlet for nested routes, or children if provided
  return children ? <>{children}</> : <Outlet />;
};

export default RoleGuard;
