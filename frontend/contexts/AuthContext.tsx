'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: 'user' | 'admin';
  addresses?: Address[];
}

interface Address {
  id: string;
  street: string;
  area: string;
  landmark?: string;
  pincode: string;
  isDefault?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  loginWithOTP: (phone: string, otp: string) => Promise<void>;
  loginWithGoogle: (token: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  sendOTP: (phone: string) => Promise<void>;
}

interface RegisterData {
  name: string;
  phone: string;
  email?: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configure axios defaults
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/auth/me');
      setUser(response.data.data);
    } catch (error) {
      // User not authenticated
    } finally {
      setLoading(false);
    }
  };

  const login = async (phone: string, password: string) => {
    try {
      const response = await axios.post('/auth/login', { phone, password });
      setUser(response.data.data);
      toast.success('Logged in successfully');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const loginWithOTP = async (phone: string, otp: string) => {
    try {
      const response = await axios.post('/auth/verify-otp', { phone, otp });
      setUser(response.data.data);
      toast.success('Logged in successfully');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
      throw error;
    }
  };

  const loginWithGoogle = async (token: string) => {
    try {
      const response = await axios.post('/auth/google', { token });
      setUser(response.data.data);
      toast.success('Logged in successfully');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Google login failed');
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await axios.post('/auth/register', data);
      setUser(response.data.data);
      toast.success('Registration successful');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      // Even if logout fails, clear local user state
      setUser(null);
      router.push('/');
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await axios.put('/users/profile', data);
      setUser(response.data.data);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
      throw error;
    }
  };

  const sendOTP = async (phone: string) => {
    try {
      await axios.post('/auth/send-otp', { phone });
      toast.success('OTP sent to your phone');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithOTP,
        loginWithGoogle,
        register,
        logout,
        updateProfile,
        sendOTP
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
