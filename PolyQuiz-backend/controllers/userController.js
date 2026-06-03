const User = require('../models/User');

// 1. Enregistrer un nouveau score (Route Protégée)
exports.updateScore = async (req, res) => {
  try {
    const { score } = req.body;
    const userId = req.user.id; // Récupéré depuis le jeton JWT décodé par le middleware (Jalon 4.2)

    if (score === undefined || score === null) {
      return res.status(400).json({ message: "Le score est manquant dans la requête." });
    }

    // Recherche de l'utilisateur en BDD
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Contrainte d'ingénierie : Mise à jour uniquement si le nouveau score est STRICTEMENT supérieur (Jalon 4.2)
    if (score > user.bestScore) {
      user.bestScore = score;
      await user.save();
      return res.status(200).json({ 
        message: "🔥 Nouveau record enregistré !", 
        bestScore: user.bestScore 
      });
    }

    return res.status(200).json({ 
      message: "Score reçu, mais pas supérieur au record actuel.", 
      bestScore: user.bestScore 
    });

  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du score :", error.message);
    return res.status(500).json({ message: "Erreur serveur lors de l'enregistrement du score." });
  }
};

// 2. Récupérer le classement général (Route Publique)
exports.getLeaderboard = async (req, res) => {
  try {
    // Récupère, trie par score décroissant (-1), limite à 10, et sélectionne uniquement pseudo et bestScore (Jalon 4.3)
    const leaderboard = await User.find()
      .sort({ bestScore: -1 })
      .limit(10)
      .select('pseudo bestScore -_id'); // Le '-_id' permet de masquer l'ID technique en sortie

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error("❌ Erreur lors du chargement du leaderboard :", error.message);
    return res.status(500).json({ message: "Erreur serveur lors du chargement du classement." });
  }
};