import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser as apiLogin, logout as apiLogout, getStoredUser, isLoggedIn } from '../utils/api';

interface User {
  mobile: string;
  name: string;
  role: string;
  district?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (mobile: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = getStoredUser();
    if (stored && isLoggedIn()) {
      setUser(stored);
    }
    setLoading(false);
  }, []);

  const login = async (mobile: string, password: string) => {
    const response = await apiLogin(mobile, password);
    if (response.ok && response.data?.user) {
      setUser(response.data.user);
      return { ok: true };
    }
    return { ok: false, error: response.error || 'Login failed' };
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
