const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question'); // On importe le modèle créé au jalon 1

// Chargement des variables d'environnement (.env)
dotenv.config();

// Lot de 10 questions thématiques d'expert (F1, NBA, Manga)
const sampleQuestions = [
  // --- THÉMATIQUE SPORTS MÉCANIQUES (F1 / MOTO GP) ---
  {
    category: "F1",
    text: "Quel pilote détient le record du plus grand nombre de pole positions dans l'histoire de la Formule 1 ?",
    options: ["Michael Schumacher", "Ayrton Senna", "Lewis Hamilton", "Sebastian Vettel"],
    correctAnswer: "Lewis Hamilton"
  },
  {
    category: "F1",
    text: "En quelle année le pilote espagnol Fernando Alonso a-t-il remporté son premier titre de champion du monde ?",
    options: ["2004", "2005", "2006", "2007"],
    correctAnswer: "2005"
  },
  {
    category: "Moto GP",
    text: "Combien de titres de champion du monde en catégorie reine (MotoGP/500cc) Valentino Rossi a-t-il remportés ?",
    options: ["5", "7", "8", "9"],
    correctAnswer: "7"
  },

  // --- THÉMATIQUE SPORTS COLLECTIFS (NBA) ---
  {
    category: "NBA",
    text: "Quel joueur est le meilleur marqueur de l'histoire de la saison régulière de la NBA ?",
    options: ["Michael Jordan", "Kareem Abdul-Jabbar", "LeBron James", "Kobe Bryant"],
    correctAnswer: "LeBron James"
  },
  {
    category: "NBA",
    text: "Quelle équipe a remporté le titre de champion NBA en 2016 après avoir été menée 3-1 en Finales ?",
    options: ["Golden State Warriors", "Cleveland Cavaliers", "Miami Heat", "San Antonio Spurs"],
    correctAnswer: "Cleveland Cavaliers"
  },
  {
    category: "NBA",
    text: "Qui détient le record du plus grand nombre de passes décisives effectuées en carrière NBA ?",
    options: ["John Stockton", "Jason Kidd", "Chris Paul", "Magic Johnson"],
    correctAnswer: "John Stockton"
  },

  // --- THÉMATIQUE CULTURE JAPONAISE (MANGA / ANIME) ---
  {
    category: "Manga",
    text: "Dans L'Attaque des Titans (Shingeki no Kyojin), quel est le nom du Titan détenu par Eren Jäger au tout début ?",
    options: ["Le Titan Assaillant", "Le Titan Cuirassé", "Le Titan Colossal", "Le Titan Féminin"],
    correctAnswer: "Le Titan Assaillant"
  },
  {
    category: "Manga",
    text: "Dans Hunter x Hunter, quel type de Nen possède le protagoniste Gon Freecss ?",
    options: ["Transmutation", "Matérialisation", "Renforcement", "Émission"],
    correctAnswer: "Renforcement"
  },
  {
    category: "Manga",
    text: "Quel est le nom du sabre noir légendaire manié par Roronoa Zoro dans One Piece, reçu à Thriller Bark ?",
    options: ["Wado Ichimonji", "Shusui", "Sandai Kitetsu", "Enma"],
    correctAnswer: "Shusui"
  },
  {
    category: "Manga",
    text: "Dans l'univers de Demon Slayer (Kimetsu no Yaiba), quelle est la technique de respiration d'origine de Zenitsu Agatsuma ?",
    options: ["Respiration de la Flamme", "Respiration de l'Eau", "Respiration de la Foudre", "Respiration de la Bête"],
    correctAnswer: "Respiration de la Foudre"
  }
];

// Fonction asynchrone pour injecter les données (Seeding)
const seedDatabase = async () => {
  try {
    // 1. Connexion temporaire à MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔌 Connexion à MongoDB établie pour le seeding...");

    // 2. Purge complète de la collection des questions existantes
    await Question.deleteMany();
    console.log("🧹 Collection 'questions' vidée avec succès.");

    // 3. Insertion massive des 10 questions codées en dur
    await Question.insertMany(sampleQuestions);
    console.log("🌱 10 questions d'expert insérées massivement avec succès !");

    // 4. Fermeture propre du script une fois terminé
    mongoose.connection.close();
    console.log("🔌 Connexion MongoDB fermée proprement.");
    process.exit(0);

  } catch (error) {
    console.error("❌ Erreur pendant le seeding de la base de données :", error.message);
    process.exit(1);
  }
};

// Exécution du script
seedDatabase();