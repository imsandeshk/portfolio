import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppRole } from "../types";
import { useSCMAuth } from "./SCMAuthContext";

export const SCMProtectedRoute: React.FC<{ children: React.ReactNode; roles?: AppRole[] }> = ({ children, roles }) => {
  const { role } = useSCMAuth();
  const location = useLocation();

  if (!role) {
    return <Navigate to="/scm/login" state={{ from: location }} replace />;
  }
  if (roles && !roles.includes(role)) {
    return <Navigate to="/scm/unauthorized" replace />;
  }
  return <>{children}</>;
};
