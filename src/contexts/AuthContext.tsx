
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export type UserRole = 'farmer' | 'logistics' | 'market_agent' | 'buyer' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  organization?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

type AuthContextType = {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  role: UserRole | null;
  isAdmin: boolean;
  isFarmer: boolean;
  isLogistics: boolean;
  isMarketAgent: boolean;
  isBuyer: boolean;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user profile and role
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.log('No user profile found:', error.message);
        return null;
      }
      
      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          setUserProfile(profile);
          setRole(profile?.role || null);
        } else {
          setUserProfile(null);
          setRole(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setUserProfile(profile);
        setRole(profile?.role || null);
      } else {
        setUserProfile(null);
        setRole(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: userData.full_name,
          role: userData.role,
          organization: userData.organization,
          phone: userData.phone,
          address: userData.address,
        }
      }
    });
    
    if (!error && data.user) {
      // Create user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: data.user.id,
          email,
          full_name: userData.full_name || '',
          role: userData.role || 'farmer',
          organization: userData.organization || '',
          phone: userData.phone || '',
          address: userData.address || '',
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
      }

      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account",
      });
    } else {
      toast({
        title: "Sign up failed",
        description: error?.message || "An error occurred",
        variant: "destructive",
      });
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error) {
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } else {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
    
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (!error) {
      setUserProfile(null);
      setRole(null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: new Error('No user logged in') };

    const { error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id);

    if (!error) {
      // Refresh user profile
      const profile = await fetchUserProfile(user.id);
      setUserProfile(profile);
      setRole(profile?.role || null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } else {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    }

    return { error };
  };

  // Computed role checks
  const isAdmin = role === 'admin';
  const isFarmer = role === 'farmer';
  const isLogistics = role === 'logistics';
  const isMarketAgent = role === 'market_agent';
  const isBuyer = role === 'buyer';

  const value = {
    user,
    session,
    userProfile,
    role,
    isAdmin,
    isFarmer,
    isLogistics,
    isMarketAgent,
    isBuyer,
    signUp,
    signIn,
    signOut,
    updateProfile,
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
