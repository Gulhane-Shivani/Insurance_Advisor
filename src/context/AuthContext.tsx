import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: string;
  full_name?: string;
  name?: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: any) => Promise<User>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: any) => {
    try {
      // Handle standard OAuth2 form data for FastAPI
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      });
      
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (error: any) {
      // Fallback for demo purposes if backend is unavailable
      if (error.code === 'ERR_NETWORK' || error.response?.status === 404 || error.response?.status === 502) {
        console.warn('Backend unavailable, using demo mode');
        const demoUser = {
          id: 'demo-123',
          full_name: 'Test Customer',
          email: credentials.email,
          role: credentials.email.includes('admin') ? 'SUPER_ADMIN' : 'USER'
        };
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify(demoUser));
        setUser(demoUser);
        return demoUser;
      }
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      await api.post('/auth/register', userData);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      loading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
