
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SupplyChainProvider } from "@/contexts/SupplyChainContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ShipmentTracking from "./pages/dashboard/ShipmentTracking";
import Notifications from "./pages/dashboard/Notifications";
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";
import AdminPanel from "./pages/admin";
import AdminLogin from "./pages/admin/login";
import NotFound from "./pages/NotFound";
import Resume from "./pages/Resume";
import ChatbotFab from "@/components/ChatbotFab";
import ErrorBoundary from "@/components/ErrorBoundary";
import "@/lib/fontawesome"; // This runs only once!

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SupplyChainProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter basename="/">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/shipments" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/tracking" element={
                    <ProtectedRoute>
                      <ShipmentTracking />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/notifications" element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/reports" element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminPanel />
                    </ProtectedRoute>
                  } />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ChatbotFab />
              </BrowserRouter>
            </TooltipProvider>
          </SupplyChainProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
