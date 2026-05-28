import React, { createContext, useState } from 'react';

// 1. Instanciation du contexte global
export const UserContext = createContext();

// 2. Développement du composant Provider
export function UserProvider({ children }) {
  // 3. État global : pseudonyme (null par défaut) et meilleur score
  const [username, setUsername] = useState(null);
  const [highScore, setHighScore] = useState(0);

  return (
    <UserContext.Provider value={{ username, setUsername, highScore, setHighScore }}>
      {children}
    </UserContext.Provider>
  );
}