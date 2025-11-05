import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SCMAuthProvider } from "./auth/SCMAuthContext";
import { SCMProtectedRoute } from "./auth/SCMProtectedRoute";
import { SCMLayout } from "./components/SCMLayout";
import SCMLogin from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import DashboardRouter from "./pages/DashboardRouter";
import ShipmentsList from "./pages/shipments/ShipmentsList";
import ShipmentDetail from "./pages/shipments/ShipmentDetail";
import DataEntry from "./pages/forms/DataEntry";
import NotificationsCenter from "./pages/notifications/NotificationsCenter";
import Reports from "./pages/reports/Reports";
import SCMMap from "./pages/Map";
import AdminUsers from "./pages/admin/Users";
import Disputes from "./pages/admin/Disputes";

const SCMApp: React.FC = () => {
  return (
    <SCMAuthProvider>
      <Routes>
        <Route path="/scm/login" element={<SCMLogin />} />
        <Route path="/scm/unauthorized" element={<Unauthorized />} />
        <Route
          path="/scm"
          element={
            <SCMProtectedRoute>
              <SCMLayout />
            </SCMProtectedRoute>
          }
        >
          <Route index element={<DashboardRouter />} />
          <Route path="shipments" element={<ShipmentsList />} />
          <Route path="shipments/:id" element={<ShipmentDetail />} />
          <Route
            path="forms"
            element={
              <SCMProtectedRoute roles={["farmer", "logistics"]}>
                <DataEntry />
              </SCMProtectedRoute>
            }
          />
          <Route path="notifications" element={<NotificationsCenter />} />
          <Route
            path="reports"
            element={
              <SCMProtectedRoute roles={["admin", "market_agent"]}>
                <Reports />
              </SCMProtectedRoute>
            }
          />
          <Route path="map" element={<SCMMap />} />
          <Route
            path="admin/users"
            element={
              <SCMProtectedRoute roles={["admin"]}>
                <AdminUsers />
              </SCMProtectedRoute>
            }
          />
          <Route
            path="admin/disputes"
            element={
              <SCMProtectedRoute roles={["admin"]}>
                <Disputes />
              </SCMProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/scm" replace />} />
      </Routes>
    </SCMAuthProvider>
  );
};

export default SCMApp;
