import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx'; // 👈 Importation du Provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider> {/* 👈 Le Provider doit envelopper l'application */}
      <App />
    </UserProvider>
  </React.StrictMode>,
);