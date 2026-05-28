import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('fitnessandi_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (err) {
        console.error('Failed to parse session:', err);
        localStorage.removeItem('fitnessandi_session');
      }
    }
    setLoading(false);
  }, []);

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('fitnessandi_users') || '[]');
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      joinedAt: new Date().toISOString(),
      profile: {
        goal: null,
        stats: { age: null, height: null, weight: null, targetWeight: null },
        activityLevel: null,
        diet: null,
      },
      isOnboarded: false,
    };

    users.push(newUser);
    localStorage.setItem('fitnessandi_users', JSON.stringify(users));
    localStorage.setItem('fitnessandi_session', JSON.stringify(newUser));
    setUser(newUser);

    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('fitnessandi_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);

    if (!found) {
      return { success: false, error: 'Invalid email or password' };
    }

    localStorage.setItem('fitnessandi_session', JSON.stringify(found));
    setUser(found);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('fitnessandi_session');
    setUser(null);
  };

  const updateProfile = (profileData) => {
    const updated = {
      ...user,
      profile: profileData,
      isOnboarded: true,
    };
    const users = JSON.parse(localStorage.getItem('fitnessandi_users') || '[]');
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = updated;
      localStorage.setItem('fitnessandi_users', JSON.stringify(users));
    }
    localStorage.setItem('fitnessandi_session', JSON.stringify(updated));
    setUser(updated);
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
