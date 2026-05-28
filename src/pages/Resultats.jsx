import React, { useContext, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Resultats() {
  const { username, highScore } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  // État superficiel pour tester la résistance du useMemo lors des rafraîchissements (ex: Changement de thème)
  const [darkMode, setDarkMode] = useState(false);

  // Récupération des scores transmis par la navigation
  const scoreSession = location.state?.score || 0;
  const totalQuestions = location.state?.total || 1;

  // Jalon 5.2: Isolation du calcul lourd via useMemo
  const ratioCalculer = useMemo(() => {
    // Simulation d'une opération gourmande ou calcul de ratio précis
    if (totalQuestions === 0) return 0;
    return ((scoreSession / totalQuestions) * 100).toFixed(1);
  }, [scoreSession, totalQuestions]); // Ne s'exécute que si ces valeurs mutent

  return (
    <div style={{ 
      padding: '3rem', 
      maxWidth: '550px', 
      margin: '40px auto', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      textAlign: 'center',
      backgroundColor: darkMode ? '#2c3e50' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000',
      transition: 'background-color 0.3s'
    }}>
      <h2>Compétition Terminée ! 🎉</h2>
      <p>Félicitations <strong>{username}</strong> pour avoir validé vos épreuves.</p>
      
      <hr style={{ margin: '1.5rem 0', borderColor: '#eee' }} />
      
      <div style={{ margin: '2rem 0' }}>
        <p style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>Score de cette session : <strong style={{ color: '#27ae60' }}>{scoreSession} / {totalQuestions}</strong></p>
        <p style={{ fontSize: '1.1rem' }}>Taux de réussite (calculé par useMemo) : <strong>{ratioCalculer}%</strong></p>
        <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>Votre record absolu sur PolyQuiz : {highScore} / {totalQuestions}</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '2rem' }}>
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          Basculer en mode {darkMode ? 'Clair' : 'Sombre'}
        </button>
        <button 
          onClick={() => navigate('/')} 
          style={{ padding: '0.5rem 1rem', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Recommencer
        </button>
      </div>
    </div>
  );
}