import React, { useEffect, useState, createContext, useContext } from 'react';
import { users } from '../data/users';
interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  following: string[];
  followers: string[];
  createdAt: string;
}
interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (userData: Partial<User>) => boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // Simulate loading user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      // Auto-login as demo user for this prototype
      const demoUser = users[0];
      setCurrentUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(demoUser));
    }
  }, []);
  const login = (email: string, password: string) => {
    // In a real app, we would validate credentials against a backend
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };
  const register = (userData: Partial<User>) => {
    // In a real app, we would send this data to a backend
    const newUser = {
      id: `user-${Date.now()}`,
      username: userData.username || '',
      name: userData.name || '',
      email: userData.email || '',
      bio: userData.bio || '',
      avatar: userData.avatar || 'https://i.pravatar.cc/150?img=5',
      following: [],
      followers: [],
      createdAt: new Date().toISOString()
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };
  return <AuthContext.Provider value={{
    currentUser,
    isAuthenticated,
    login,
    logout,
    register
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};