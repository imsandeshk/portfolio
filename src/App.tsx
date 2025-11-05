
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Index from "./pages/Index";
import SupplyChainLanding from "./pages/SupplyChainLanding";
import AdminPanel from "./pages/admin";
import AdminLogin from "./pages/admin/login";
import NotFound from "./pages/NotFound";
import Resume from "./pages/Resume";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ShipmentTracking from "./pages/dashboard/ShipmentTracking";
import DataEntry from "./pages/dashboard/DataEntry";
import Notifications from "./pages/dashboard/Notifications";
import Reports from "./pages/dashboard/Reports";
import Unauthorized from "./pages/Unauthorized";
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
              {/* Public routes */}
              <Route path="/" element={<SupplyChainLanding />} />
              <Route path="/portfolio" element={<Index />} />
              <Route path="/resume" element={<Resume />} />
              
              {/* Authentication routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              
              {/* Dashboard routes - require authentication */}
              <Route path="/dashboard" element={
                <ProtectedRoute requireAuth={true}>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/tracking" element={
                <ProtectedRoute requireAuth={true}>
                  <DashboardLayout>
                    <ShipmentTracking />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/data-entry" element={
                <ProtectedRoute requireAuth={true} allowedRoles={['farmer', 'logistics']}>
                  <DashboardLayout>
                    <DataEntry />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/notifications" element={
                <ProtectedRoute requireAuth={true}>
                  <DashboardLayout>
                    <Notifications />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/reports" element={
                <ProtectedRoute requireAuth={true}>
                  <DashboardLayout>
                    <Reports />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              {/* Unauthorized page */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Fallback route */}
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
