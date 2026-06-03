import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Login() {
  const [pseudoInput, setPseudoInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pseudoInput.trim()) return;

    try {
      // 1. Appel POST vers ton API de login Node.js (Jalon 5.1)
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: pseudoInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'authentification");
      }

      // 2. Stockage du token JWT reçu dans le localStorage (Jalon 5.1)
      localStorage.setItem("polyquiz_token", data.token);

      // 3. Mise à jour du contexte global de l'application
      if (loginUser) {
        loginUser(data.user.pseudo);
      }

      // 4. Redirection vers le jeu
      navigate("/quiz");

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎓 Bienvenue sur PolyQuiz !</h1>
      <p>Testez vos connaissances au niveau Expert (F1, NBA, Manga)</p>
      
      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <input
          type="text"
          placeholder="Entrez votre pseudonyme..."
          value={pseudoInput}
          onChange={(e) => setPseudoInput(e.target.value)}
          style={{ padding: "0.5rem", fontSize: "1rem", marginRight: "1rem" }}
          required
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer" }}>
          Rejoindre l'arène
        </button>
      </form>

      {errorMessage && <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>}
    </div>
  );
}

export default Login;