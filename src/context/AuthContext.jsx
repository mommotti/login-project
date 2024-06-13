import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') {
        navigate('/homepage');
      }
    } else {
      setIsAuthenticated(false);
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        navigate('/');
      }
    }
  }, [navigate, location.pathname]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    toast.success('Login successful');
    navigate('/homepage');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    toast.info('Logged out');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
