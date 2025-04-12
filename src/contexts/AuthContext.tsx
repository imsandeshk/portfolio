
import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin password
const DEMO_PASSWORD = "@#Sandesh58";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always default to true for demo purposes
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const login = async (password: string): Promise<boolean> => {
    try {
      // Simple password check (no localStorage)
      const isValid = password === DEMO_PASSWORD;
      
      if (isValid) {
        setIsAdmin(true);
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Incorrect password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  // All authentication functionalities are maintained but localStorage dependency is removed
  const value = {
    isAdmin,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
