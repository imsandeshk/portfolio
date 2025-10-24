import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types/scm';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const SCMAuthContext = createContext<AuthContextType | undefined>(undefined);

export const useSCMAuth = () => {
  const context = useContext(SCMAuthContext);
  if (!context) {
    throw new Error('useSCMAuth must be used within SCMAuthProvider');
  }
  return context;
};

interface SCMAuthProviderProps {
  children: ReactNode;
}

export const SCMAuthProvider: React.FC<SCMAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('scm_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate API call - replace with actual backend integration
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role,
      phoneNumber: '+1234567890',
      address: '123 Main St',
    };
    
    setUser(mockUser);
    localStorage.setItem('scm_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('scm_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('scm_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <SCMAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </SCMAuthContext.Provider>
  );
};
