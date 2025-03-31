
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAdminStatus, setAdminStatus, verifyAdminPassword } from "@/services/storageService";
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const adminStatus = getAdminStatus();
    setIsAdmin(adminStatus);
    setLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      const isValid = verifyAdminPassword(password);
      
      if (isValid) {
        setIsAdmin(true);
        setAdminStatus(true);
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
    setAdminStatus(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

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
