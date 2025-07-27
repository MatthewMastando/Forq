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
  
  console.log('AuthProvider initialized');

  // Fetch user profile from profiles table
  const fetchUserProfile = async (userId: string) => {
    console.log('Fetching user profile for:', userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    console.log('User profile fetched:', data);
    return data;
  };

  // Handle auth state changes
  useEffect(() => {
    console.log('Setting up auth state listener');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        setIsLoading(true);
        
        // Add timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          console.warn('Auth state change timeout, forcing loading to false');
          setIsLoading(false);
        }, 5000); // 5 second timeout
        
        try {
          if (session?.user) {
            console.log('User session found, fetching profile...');
            const profile = await fetchUserProfile(session.user.id);
            setCurrentUser(profile);
            setIsAuthenticated(true);
            console.log('Profile set, user authenticated');
          } else {
            console.log('No session, clearing user state');
            setCurrentUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          setCurrentUser(null);
          setIsAuthenticated(false);
        } finally {
          clearTimeout(timeoutId);
          setIsLoading(false);
          console.log('Auth state change complete, loading set to false');
        }
      }
    );

      // Also check initial session immediately
  const checkInitialSession = async () => {
    console.log('Checking initial session...');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log('Initial session found:', session.user.id);
        const profile = await fetchUserProfile(session.user.id);
        setCurrentUser(profile);
        setIsAuthenticated(true);
      } else {
        console.log('No initial session found');
      }
    } catch (error) {
      console.error('Error checking initial session:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  checkInitialSession();

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    console.log('Signing up user:', email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Signup error:', error);
      return { error };
    }

    if (data.user) {
      console.log('User created, creating profile for:', data.user.id);
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
      console.log('Profile created successfully');
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    console.log('Signing in user:', email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Signin error:', error);
    } else {
      console.log('Signin successful');
    }

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