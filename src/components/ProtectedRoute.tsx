
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireRoles?: string[]; // any of these roles required
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false, requireRoles }) => {
  const location = useLocation();
  const { user, isAdmin, roles, loading } = useAuth();

  if (loading) {
    return null; // could render a spinner if desired
  }

  if (requireAdmin) {
    const legacyAdmin = typeof localStorage !== 'undefined' && localStorage.getItem('adminAuthenticated') === 'true';
    const allowed = isAdmin || roles.includes('admin') || legacyAdmin;
    if (!allowed) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  }

  if (requireRoles && requireRoles.length > 0) {
    const hasAny = requireRoles.some((r) => roles.includes(r) || (r === 'admin' && isAdmin));
    if (!hasAny) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
