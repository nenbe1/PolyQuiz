import React, { useReducer, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { UserContext } from '../context/UserContext';

// Jalon 4.2: État initial de la machine à état
const initialState = {
  currentQuestionIndex: 0,
  scoreTemporaire: 0,
  gameStatus: 'PLAYING', // PLAYING, FINISHED
  reponsesSelectionnees: []
};

// Jalon 4.2: Fonction pure Reducer externe au composant
function quizReducer(state, action) {
  switch (action.type) {
    case 'ANSWER_QUESTION': {
      const { reponse, bonneReponse, totalQuestions } = action.payload;
      const isCorrect = reponse === bonneReponse;
      const newScore = isCorrect ? state.scoreTemporaire + 1 : state.scoreTemporaire;
      const nextIndex = state.currentQuestionIndex + 1;
      const isFinished = nextIndex >= totalQuestions;

      return {
        ...state,
        scoreTemporaire: newScore,
        currentQuestionIndex: isFinished ? state.currentQuestionIndex : nextIndex,
        gameStatus: isFinished ? 'FINISHED' : 'PLAYING',
        reponsesSelectionnees: [...state.reponsesSelectionnees, reponse]
      };
    }
    case 'FINISH_QUIZ':
      return {
        ...state,
        gameStatus: 'FINISHED'
      };
    default:
      return state;
  }
}

export default function QuizEngine() {
  const { username, setHighScore, highScore } = useContext(UserContext);
  const { data: questions, loading, error } = useFetch('/questions.json');
  const [state, dispatch] = useReducer(quizReducer, initialState);
  
  // Jalon 5.1: Gestion fine du compte à rebours de 60 secondes via useRef
  const [timeLeft, setTimeLeft] = React.useState(60);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // Gestion du cycle de vie du chronomètre
  useEffect(() => {
    // Initialisation du setInterval
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Contrainte Jalon 5.2 : Nettoyage et expédition de l'action de fin
          clearInterval(timerRef.current);
          dispatch({ type: 'FINISH_QUIZ' });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Fonction de nettoyage (Cleanup) essentielle pour éviter les fuites de mémoire
    return () => clearInterval(timerRef.current);
  }, []);

  // Écoute de l'état du jeu pour la redirection en fin de partie
  useEffect(() => {
    if (state.gameStatus === 'FINISHED') {
      clearInterval(timerRef.current); // Sécurité additionnelle
      // Sauvegarde du meilleur score dans le contexte global
      if (state.scoreTemporaire > highScore) {
        setHighScore(state.scoreTemporaire);
      }
      // Redirection et transmission du score de la session actuelle
      navigate('/resultats', { state: { score: state.scoreTemporaire, total: questions?.length || 0 } });
    }
  }, [state.gameStatus, state.scoreTemporaire, questions, navigate, highScore, setHighScore]);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement des questions du serveur de Maroua...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Erreur réseau : {error}</div>;
  if (!questions || questions.length === 0) return null;

  const currentQuestion = questions[state.currentQuestionIndex];

  const handleOptionClick = (option) => {
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        reponse: option,
        bonneReponse: currentQuestion.bonne_reponse,
        totalQuestions: questions.length
      }
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '650px', margin: '30px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span>Joueur : <strong>{username}</strong></span>
        {/* Affichage du chronomètre */}
        <span style={{ padding: '0.4rem 0.8rem', backgroundColor: timeLeft <= 15 ? '#e74c3c' : '#2ecc71', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>
          Temps restant : {timeLeft}s
        </span>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.85rem', backgroundColor: '#34495e', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '3px' }}>
          {currentQuestion.categorie}
        </span>
        <p style={{ float: 'right', margin: 0, fontSize: '0.9rem' }}>
          Question {state.currentQuestionIndex + 1} / {questions.length}
        </p>
      </div>

      <h3 style={{ margin: '1.5rem 0', lineHeight: '1.4' }}>{currentQuestion.libelle}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            style={{ padding: '1rem', textAlign: 'left', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#eef0f2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f8f9fa'}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}