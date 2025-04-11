
import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Modified to always allow access (regardless of admin status)
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Always render children directly - no authentication check
  return <>{children}</>;
};

export default ProtectedRoute;
