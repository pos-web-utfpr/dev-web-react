import React from 'react';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute: React.FC = () => {
  // Simulação de autenticação (pode ser alterada futuramente por Context/API)
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
