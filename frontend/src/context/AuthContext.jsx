import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent session
    const storedUser = localStorage.getItem('streetcart_user');
    const storedToken = localStorage.getItem('streetcart_token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        api.setToken(storedToken);
      } catch (e) {
        localStorage.removeItem('streetcart_user');
        localStorage.removeItem('streetcart_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const res = await api.login(credentials);
    if (res && res.user) {
      setUser(res.user);
      localStorage.setItem('streetcart_user', JSON.stringify(res.user));
      return { success: true, user: res.user };
    }
    return { success: false, error: 'Login failed. Please check credentials.' };
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    if (res && res.user) {
      setUser(res.user);
      localStorage.setItem('streetcart_user', JSON.stringify(res.user));
      return { success: true, user: res.user };
    }
    return { success: false, error: 'Registration failed.' };
  };

  const logout = () => {
    setUser(null);
    api.setToken(null);
    localStorage.removeItem('streetcart_user');
    localStorage.removeItem('streetcart_token');
  };

  const isShopOwner = user?.role === 'shop_owner';
  const isCustomer = user?.role === 'customer';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isShopOwner,
        isCustomer,
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
