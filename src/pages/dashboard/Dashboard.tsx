import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FarmerDashboard from '@/components/dashboard/FarmerDashboard';
import LogisticsDashboard from '@/components/dashboard/LogisticsDashboard';
import MarketAgentDashboard from '@/components/dashboard/MarketAgentDashboard';
import BuyerDashboard from '@/components/dashboard/BuyerDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

const Dashboard = () => {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  const renderDashboard = () => {
    switch (role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'logistics':
        return <LogisticsDashboard />;
      case 'market_agent':
        return <MarketAgentDashboard />;
      case 'buyer':
        return <BuyerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <div className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Supply Chain Management
              </h2>
              <p className="text-gray-600">
                Please contact an administrator to assign your role.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;