
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import AdminPanel from "./pages/admin";
import AdminLogin from "./pages/admin/login";
import FarmerDashboard from "@/pages/scm/FarmerDashboard";
import LogisticsDashboard from "@/pages/scm/LogisticsDashboard";
import BuyerDashboard from "@/pages/scm/BuyerDashboard";
import MarketAgentDashboard from "@/pages/scm/MarketAgentDashboard";
import AdminScmDashboard from "@/pages/scm/AdminScmDashboard";
import ShipmentTracking from "@/pages/scm/ShipmentTracking";
import NotificationsCenter from "@/pages/scm/NotificationsCenter";
import AnalyticsReports from "@/pages/scm/AnalyticsReports";
import RoleSelector from "@/pages/scm/RoleSelector";
import DataEntryForms from "@/pages/scm/DataEntryForms";
import NotFound from "./pages/NotFound";
import Resume from "./pages/Resume";
import ChatbotFab from "@/components/ChatbotFab";
import "@/lib/fontawesome"; // This runs only once!

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              {/* SCM role-based routes */}
              <Route path="/scm/farmer" element={
                <ProtectedRoute requireRoles={["farmer", "admin"]}>
                  <FarmerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/scm/logistics" element={
                <ProtectedRoute requireRoles={["logistics", "admin"]}>
                  <LogisticsDashboard />
                </ProtectedRoute>
              } />
              <Route path="/scm/buyer" element={
                <ProtectedRoute requireRoles={["buyer", "admin"]}>
                  <BuyerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/scm/market-agent" element={
                <ProtectedRoute requireRoles={["market-agent", "admin"]}>
                  <MarketAgentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/scm/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminScmDashboard />
                </ProtectedRoute>
              } />
              <Route path="/scm/shipments" element={
                <ProtectedRoute requireRoles={["farmer", "logistics", "buyer", "market-agent", "admin"]}>
                  <ShipmentTracking />
                </ProtectedRoute>
              } />
              <Route path="/scm/notifications" element={
                <ProtectedRoute requireRoles={["farmer", "logistics", "buyer", "market-agent", "admin"]}>
                  <NotificationsCenter />
                </ProtectedRoute>
              } />
              <Route path="/scm/reports" element={
                <ProtectedRoute requireRoles={["admin", "market-agent"]}>
                  <AnalyticsReports />
                </ProtectedRoute>
              } />
              <Route path="/scm/forms" element={
                <ProtectedRoute requireRoles={["farmer", "logistics", "admin"]}>
                  <DataEntryForms />
                </ProtectedRoute>
              } />
              <Route path="/scm/roles" element={<RoleSelector />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatbotFab />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
