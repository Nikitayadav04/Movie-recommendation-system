import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/mockBackend';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string, genres: string[]) => Promise<void>;
  logout: () => void;
  updateUserWatchlist: (watchlist: string[]) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persisted session
    const storedUser = localStorage.getItem('cinesense_session_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    const loggedInUser = await api.auth.login(email, pass);
    setUser(loggedInUser);
    localStorage.setItem('cinesense_session_user', JSON.stringify(loggedInUser));
  };

  const signup = async (name: string, email: string, pass: string, genres: string[]) => {
    const newUser = await api.auth.signup(name, email, pass, genres);
    setUser(newUser);
    localStorage.setItem('cinesense_session_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cinesense_session_user');
  };

  const updateUserWatchlist = (watchlist: string[]) => {
    if (user) {
      const updatedUser = { ...user, watchlist };
      setUser(updatedUser);
      localStorage.setItem('cinesense_session_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUserWatchlist, loading }}>
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