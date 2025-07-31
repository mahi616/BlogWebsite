import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; // At the top of the file

// Create the context
const AuthContext = createContext(undefined);

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // Holds current user
  const [loading, setLoading] = useState(false); // Simulated loading


// sign up function
const signUp = async (email, password, fullName, profileImage, about) => {
  setLoading(true);
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      email,
      password,
      confirmPassword: password, // for backend validation
      fullName,
      profileImage, // <-- new field
      about         // <-- new field
    });

    // Set the user data (if returned from backend)
    setUser({
      email,
      fullName,
      profileImage,
      about,
    });
  } catch (err) {
    console.error('Signup error:', err);
    throw err;
  } finally {
    setLoading(false);
  }
};


  // sign-in function
const signIn = async (email, password) => {
  setLoading(true);
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });
    console.log('Login response:', res.data);

    const userData = res.data.user;
    setUser(userData);

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('role', 'user');
    localStorage.setItem('userId', userData._id);

    return res; // ✅ Return the response
  } catch (err) {
    console.error('Login error:', err);
    throw err.response?.data || { message: 'Login failed' };
  } finally {
    setLoading(false);
  }
};


  // Dummy sign-out function
  const signOut = async () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
