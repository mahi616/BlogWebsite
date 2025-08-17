import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

// Base URL from environment variable
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);    
  const [loading, setLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // SIGN UP
  const signUp = async (email, password, fullName, profileImage = null, about = '') => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, {
        email,
        password,
        confirmPassword: password, // for backend validation
        fullName,
        profileImage,
        about
      });

      const userData = res.data.user || {
        email,
        fullName,
        profileImage,
        about
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userId', userData._id);
      localStorage.setItem('role', 'user');

      return userData;
    } catch (err) {
      console.error('Signup error:', err);
      throw err.response?.data || { message: 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  // SIGN IN
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
      const userData = res.data.user;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userId', userData._id);
      localStorage.setItem('role', 'user');

      return userData;
    } catch (err) {
      console.error('Login error:', err);
      throw err.response?.data || { message: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // SIGN OUT
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
