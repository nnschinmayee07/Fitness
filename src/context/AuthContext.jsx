import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('fitnessandi_token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const { user } = await res.json();
        setUser(user);
      } else {
        localStorage.removeItem('fitnessandi_token');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('fitnessandi_token');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error };
      }

      localStorage.setItem('fitnessandi_token', data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      // Fallback: check if API is not available (local dev without vercel dev)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn('API not available. Make sure to run: vercel dev');
      }
      return { success: false, error: 'API Error — run "vercel dev" to start the backend' };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error };
      }

      localStorage.setItem('fitnessandi_token', data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn('API not available. Make sure to run: vercel dev');
      }
      return { success: false, error: 'API Error — run "vercel dev" to start the backend' };
    }
  };

  const logout = () => {
    localStorage.removeItem('fitnessandi_token');
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    const token = localStorage.getItem('fitnessandi_token');
    if (!token) return;

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profile: profileData }),
      });

      if (res.ok) {
        const { user } = await res.json();
        setUser(user);
      }
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
