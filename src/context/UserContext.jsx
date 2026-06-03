import React, { createContext, useState } from "react";

// 1. Instanciation du contexte global
export const UserContext = createContext();

// 2. Développement du composant Provider
export function UserProvider({ children }) {
  const [username, setUsername] = useState(null); // null par défaut
  const [highScore, setHighScore] = useState(0);

  // La fonction que ton formulaire d'accueil recherche !
  const loginUser = (pseudo) => {
    setUsername(pseudo);
  };

  const logoutUser = () => {
    setUsername(null);
  };

  return (
    // ⚠️ VÉRIFIE BIEN CETTE LIGNE : loginUser doit être présent dans l'objet value !
    <UserContext.Provider value={{ username, highScore, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}