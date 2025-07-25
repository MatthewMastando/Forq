import React, { useEffect, useState, createContext, useContext } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { PostgrestError } from '@supabase/postgrest-js';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  following: string[];
  followers: string[];
  created_at: string;
}

type AuthErrorType = AuthError | PostgrestError | null;

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<{ error: AuthErrorType }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthErrorType }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: AuthErrorType }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user profile from profiles table
  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  };

  // Handle auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          setCurrentUser(profile);
          setIsAuthenticated(true);
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
        
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { error };
    }

    if (data.user) {
      // Create user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            username: userData.username || '',
            name: userData.name || '',
            email: userData.email || email,
            bio: userData.bio || '',
            avatar: userData.avatar || 'https://i.pravatar.cc/150?img=5',
            following: [],
            followers: [],
          }
        ]);

      if (profileError) {
        console.error('Error creating profile:', profileError);
        return { error: profileError };
      }
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!currentUser) {
      return { error: { message: 'No user logged in' } as AuthError };
    }

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', currentUser.id);

    if (!error) {
      setCurrentUser({ ...currentUser, ...updates });
    }

    return { error };
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      isLoading,
      signUp,
      signIn,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};