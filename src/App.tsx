
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import "@/lib/fontawesome"; // This runs only once!

const AdminPanel = lazy(() => import("./pages/admin"));
const AdminLogin = lazy(() => import("./pages/admin/login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Resume = lazy(() => import("./pages/Resume"));
const ChatbotFab = lazy(() => import("@/components/ChatbotFab"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
                <Route path="/resume" element={<Resume />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ChatbotFab />
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
