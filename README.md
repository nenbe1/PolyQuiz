 # PolyQuiz - Plateforme Interactive de Compétition Expert

[cite_start]Projet d'évaluation pratique en **Ingénierie Front-End Avancée** réalisé dans le cadre de l'Unité de Spécialité *IDE & Frameworks* à l'École Nationale Supérieure Polytechnique de Maroua[cite: 83, 84, 87].

## 🚀 Fonctionnalités et Patterns d'Ingénierie Implémentés

Ce projet démontre la mise en œuvre d'une architecture client robuste, performante et sécurisée sous React :
- [cite_start]**Abstraction Réseau (Jalon 1) :** Isolation complète de la tuyauterie et des requêtes asynchrones via le Custom Hook `useFetch` gérant l'état de chargement et les erreurs[cite: 95, 98, 100].
- [cite_start]**Gestion Globale de l'État (Jalon 2) :** Centralisation des données utilisateur (pseudonyme et meilleur score) à la racine grâce à l'API Context pour éradiquer le *Props Drilling*[cite: 90, 103, 106, 107].
- [cite_start]**Sécurisation par Routage Avancé (Jalon 3) :** Implémentation d'un composant d'architecture `<ProtectedRoute>` bloquant l'accès au moteur de jeu pour tout utilisateur non authentifié[cite: 90, 109, 111].
- [cite_start]**Machine à État Complexe (Jalon 4) :** Utilisation du Hook `useReducer` et d'une fonction de réduction pure externe pour piloter de manière déterministe les transitions du quiz[cite: 90, 115, 117].
- [cite_start]**Optimisation des Performances (Jalon 5) :** - Utilisation de `useRef` pour encapsuler l'identifiant du compte à rebours et garantir un nettoyage (*Cleanup*) parfait sans déclencher de re-rendus intempestifs[cite: 120, 123].
  - [cite_start]Utilisation de `useMemo` pour isoler le calcul du ratio de réussite sur l'écran des résultats[cite: 90, 124, 125].

---

## 🛠️ Procédure d'Installation et de Lancement

[cite_start]Suivez pas à pas ces instructions pour installer les dépendances et exécuter le serveur de développement local[cite: 72]:

### 1. Cloner le projet et installer les dépendances
[cite_start]Ouvrez votre terminal dans le répertoire racine du projet et exécutez la commande suivante pour installer l'intégralité des modules requis (notamment `react-router-dom`)[cite: 52, 72]:
```bash
npm install

2. Lancer l'application en mode développementPour démarrer le serveur de développement local fourni par Vite.js, exécutez la commande:  Bashnpm run dev
3. Accès à l'applicationUne fois le serveur démarré, ouvrez votre navigateur internet et accédez à l'adresse locale affichée dans votre terminal (généralement http://localhost:5173).📂 Architecture du Code /srcLe projet respecte une séparation stricte des responsabilités (logique réseau vs logique métier vs rendu graphique):  Plaintext/src
  ├── /components     # Briques applicatives réutilisables et barrières (ProtectedRoute)
  ├── /context        # Centralisation et diffusion de l'état global (UserContext)
  ├── /hooks          # Abstraction de la logique réseau (useFetch)
  ├── /pages          # Écrans complets du cycle de jeu (Login, QuizEngine, Resultats)
  ├── App.jsx         # Configuration de l'arbre des routes et des providers
  └── main.jsx        # Point d'entrée de l'application
