import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function ProtectedRoute({ children }) {
  const { username } = useContext(UserContext);

  // Contrainte d'Ingénierie Jalon 3 : Redirection immédiate si pas de pseudo
  if (!username) {
    return <Navigate to="/" replace />;
  }

  return children;
}