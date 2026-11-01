import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState('Checking...');

  useEffect(() => {
    initAuth();
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const data = await api.getHealth();
      setDbStatus(data.database || 'Connected');
    } catch {
      setDbStatus('In-Memory Fallback');
    }
  };

  const initAuth = async () => {
    const token = localStorage.getItem('placement_token');
    try {
      if (token) {
        const profile = await api.getProfile();
        setUser(profile);
      } else {
        // Auto-load demo user so the app is immediately populated and responsive
        const demoUser = await api.demoLogin();
        if (demoUser && demoUser.token) {
          localStorage.setItem('placement_token', demoUser.token);
          setUser(demoUser);
        }
      }
    } catch (err) {
      console.warn('Auth init failed, loading demo user', err);
      try {
        const demoUser = await api.demoLogin();
        setUser(demoUser);
      } catch (e) {
        console.error('Demo login fallback failed', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const data = await api.login(email, password);
    if (data.token) {
      localStorage.setItem('placement_token', data.token);
      setUser(data);
    }
    return data;
  };

  const register = async (studentData) => {
    const data = await api.register(studentData);
    if (data.token) {
      localStorage.setItem('placement_token', data.token);
      setUser(data);
    }
    return data;
  };

  const loadDemoUser = async () => {
    setLoading(true);
    try {
      const demoData = await api.demoLogin();
      if (demoData.token) {
        localStorage.setItem('placement_token', demoData.token);
        setUser(demoData);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedFields) => {
    const data = await api.updateProfile(updatedFields);
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('placement_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        dbStatus,
        login,
        register,
        loadDemoUser,
        updateProfile,
        logout,
        refreshHealth: checkHealth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
