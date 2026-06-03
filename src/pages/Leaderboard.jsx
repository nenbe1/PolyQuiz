import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function Leaderboard() {
  const navigate = useNavigate();
  const { data: topPlayers, loading, error } = useFetch("http://localhost:5000/api/users/leaderboard");

  if (loading) return <p style={{ textAlign: "center" }}>Chargement du classement...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>Erreur : {error}</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
      <h1>🏆 Tableau d'Honneur (TOP 10)</h1>
      <p>Les esprits les plus affûtés de l'École Polytechnique de Maroua</p>

      <table style={{ width: "100%", marginTop: "2rem", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Rang</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Joueur</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Meilleur Score</th>
          </tr>
        </thead>
        <tbody>
          {topPlayers.map((player, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", border: "1px solid #ddd", fontWeight: "bold" }}>{index + 1}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{player.pseudo}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd", color: "green", fontWeight: "bold" }}>
                {player.bestScore} pts
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/")} style={{ marginTop: "2rem", padding: "0.5rem 1rem", cursor: "pointer" }}>
        Retour à l'Accueil
      </button>
    </div>
  );
}

export default Leaderboard;