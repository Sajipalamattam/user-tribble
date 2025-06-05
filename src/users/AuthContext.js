import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage on first render
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Login function: set user in state and localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function: clear user in state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = { user, login, logout, isLoggedIn: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
