import React from 'react';
import { useSCMAuth } from '@/contexts/SCMAuthContext';
import FarmerDashboard from './dashboards/FarmerDashboard';
import LogisticsDashboard from './dashboards/LogisticsDashboard';
import BuyerDashboard from './dashboards/BuyerDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import MarketAgentDashboard from './dashboards/MarketAgentDashboard';

const Dashboard: React.FC = () => {
  const { user } = useSCMAuth();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'farmer':
      return <FarmerDashboard />;
    case 'logistics':
      return <LogisticsDashboard />;
    case 'buyer':
      return <BuyerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'market_agent':
      return <MarketAgentDashboard />;
    default:
      return <div>Invalid role</div>;
  }
};

export default Dashboard;
