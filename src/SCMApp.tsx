import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { SCMAuthProvider, useSCMAuth } from '@/contexts/SCMAuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';

// Pages
import Login from '@/pages/scm/Login';
import Dashboard from '@/pages/scm/Dashboard';
import ShipmentTracking from '@/pages/scm/ShipmentTracking';
import Notifications from '@/pages/scm/Notifications';
import Analytics from '@/pages/scm/Analytics';
import Reports from '@/pages/scm/Reports';
import CreateShipment from '@/pages/scm/CreateShipment';
import AllShipments from '@/pages/scm/AllShipments';

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSCMAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/scm/login" replace />;
  }
  
  return <>{children}</>;
};

const SCMRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/scm/login" element={<Login />} />
      <Route
        path="/scm/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/scm/shipments/:id/track"
        element={
          <ProtectedRoute>
            <ShipmentTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/scm/shipments/:id"
        element={
          <ProtectedRoute>
            <ShipmentTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/scm/shipments/create"
        element={
          <ProtectedRoute>
            <CreateShipment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/scm/shipments"
        element={
          <ProtectedRoute>
            <AllShipments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/scm/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/scm/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/scm/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route path="/scm" element={<Navigate to="/scm/login" replace />} />
      <Route path="/" element={<Navigate to="/scm/login" replace />} />
      <Route path="*" element={<Navigate to="/scm/login" replace />} />
    </Routes>
  );
};

const SCMApp: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SCMAuthProvider>
          <NotificationProvider>
            <SCMRoutes />
            <Toaster />
          </NotificationProvider>
        </SCMAuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default SCMApp;
