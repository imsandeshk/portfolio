import React, { createContext, useContext, useMemo, useState } from "react";
import { AppRole, UserProfile } from "../types";
import { MockApi } from "../services/mockApi";

export type SCMAuthContextType = {
  currentUser: UserProfile | null;
  role: AppRole | null;
  signInAsRole: (role: AppRole) => void;
  signOut: () => void;
};

const SCMAuthContext = createContext<SCMAuthContextType | undefined>(undefined);

export const SCMAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const signInAsRole = (role: AppRole) => {
    const user = MockApi.getUserByRole(role);
    setCurrentUser(user ?? null);
  };

  const signOut = () => setCurrentUser(null);

  const value = useMemo(
    () => ({ currentUser, role: currentUser?.role ?? null, signInAsRole, signOut }),
    [currentUser]
  );

  return <SCMAuthContext.Provider value={value}>{children}</SCMAuthContext.Provider>;
};

export const useSCMAuth = () => {
  const ctx = useContext(SCMAuthContext);
  if (!ctx) throw new Error("useSCMAuth must be used within SCMAuthProvider");
  return ctx;
};
