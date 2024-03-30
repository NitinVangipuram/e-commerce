import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDetails = localStorage.getItem('user');
    if (token && userDetails) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userDetails));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Persist user details
      setIsAuthenticated(true);
      setUser(data.user);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user details from local storage
    setUser(null);
    setIsAuthenticated(false);
  };

  // Your register function and return statement remain the same...



   const register = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Adjust according to your User model
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      // Maybe redirect to login page or automatically log the user in
    } catch (error) {
      console.error(error);
      throw error; // Or handle it more gracefully
    }
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
