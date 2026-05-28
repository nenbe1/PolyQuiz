import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const [pseudoInput, setPseudoInput] = useState('');
  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (pseudoInput.trim().length >= 3) {
      setUsername(pseudoInput.trim());
      navigate('/quiz'); // Direction le quiz
    } else {
      alert("Veuillez saisir un pseudonyme de 3 caractères minimum.");
    }
  };

  return (
    <div style={{ padding: '3rem', maxWidth: '450px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
      <h2>PolyQuiz 🏁</h2>
      <p style={{ color: '#666' }}>Plateforme Interactive de Compétition Expert</p>
      
      <form onSubmit={handleStart} style={{ marginTop: '2rem' }}>
        <input 
          type="text"
          placeholder="Entrez votre pseudonyme..."
          value={pseudoInput}
          onChange={(e) => setPseudoInput(e.target.value)}
          style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          required
        />
        <button type="submit" style={{ width: '100%', padding: '0.8rem', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Rejoindre la compétition
        </button>
      </form>
    </div>
  );
}