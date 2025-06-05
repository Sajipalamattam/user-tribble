import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if the user is authenticated (e.g., has a token)
  const token = localStorage.getItem('token');
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // If authenticated, render the requested route
  return <Outlet />;
};

export default ProtectedRoute;
