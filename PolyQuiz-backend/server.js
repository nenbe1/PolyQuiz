const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Importation des fichiers de routes (Jalon 5)
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');

// Configuration des variables d'environnement (.env)
dotenv.config();

// Initialisation de l'application Express
const app = express();

// Connexion à la base de données MongoDB Atlas (Jalon 1.1)
connectDB();

// Middlewares globaux essentiels
app.use(cors()); // Autorise ton projet React à interroger ton API
app.use(express.json()); // Permet à Express de lire le format JSON dans req.body

// Montage des aiguillages de routes de notre API Restful
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);

// Route de diagnostic rapide
app.get('/', (req, res) => {
  res.send("🚀 L'API PolyQuiz tourne à plein régime !");
});

// Lancement du serveur d'ingénierie
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`📡 Serveur démarré sur le port ${PORT}...`);
});