import React from "react";
import { useSCMAuth } from "../auth/SCMAuthContext";
import FarmerDashboard from "./dashboards/FarmerDashboard";
import LogisticsDashboard from "./dashboards/LogisticsDashboard";
import BuyerDashboard from "./dashboards/BuyerDashboard";
import MarketAgentDashboard from "./dashboards/MarketAgentDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";

const DashboardRouter: React.FC = () => {
  const { role } = useSCMAuth();
  if (!role) return <div>Select a role to view dashboard.</div>;
  switch (role) {
    case "farmer":
      return <FarmerDashboard />;
    case "logistics":
      return <LogisticsDashboard />;
    case "buyer":
      return <BuyerDashboard />;
    case "market_agent":
      return <MarketAgentDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <div>Unsupported role</div>;
  }
};

export default DashboardRouter;
