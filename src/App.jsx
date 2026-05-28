import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

// Importation des pages (créées dans les jalons suivants)
import Login from './pages/Login';
import QuizEngine from './pages/QuizEngine';
import Resultats from './pages/Resultats';

export default function App() {
  return (
    // Jalon 2.4: Enveloppement global avec le UserProvider
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Route publique d'authentification */}
          <Route path="/" element={<Login />} />

          {/* Routes privées sécurisées via ProtectedRoute */}
          <Route 
            path="/quiz" 
            element={
              <ProtectedRoute>
                <QuizEngine />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/resultats" 
            element={
              <ProtectedRoute>
                <Resultats />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}