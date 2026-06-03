import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function QuizEngine() {
  const navigate = useNavigate();
  
  // 1. Appel dynamique à la route de ton API MongoDB au lieu du fichier statique (Jalon 5.3)
  const { data: questions, loading, error } = useFetch("http://localhost:5000/api/questions");
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Gestion de la réponse sélectionnée
  const handleAnswer = (option) => {
    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      endGame(score + (isCorrect ? 1 : 0));
    }
  };

  // 2. Envoi du score final au serveur (Jalon 5.4)
  const endGame = async (finalScore) => {
    const token = localStorage.getItem("polyquiz_token");
    
    try {
      await fetch("http://localhost:5000/api/users/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Route sécurisée
        },
        body: JSON.stringify({ score: finalScore }),
      });
    } catch (err) {
      console.error("Erreur lors de l'envoi du score :", err);
    }

    // Redirection vers l'écran des résultats en passant le score final dans le state
    navigate("/resultats", { state: { finalScore } });
  };

  if (loading) return <p>Chargement des questions d'expert...</p>;
  if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Catégorie : {questions[currentQuestionIndex].category}</h2>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{questions[currentQuestionIndex].text}</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
        {questions[currentQuestionIndex].options.map((option, idx) => (
          <button 
            key={idx} 
            onClick={() => handleAnswer(option)}
            style={{ padding: "0.8rem", fontSize: "1rem", cursor: "pointer" }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizEngine;