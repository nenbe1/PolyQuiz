const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { pseudo } = req.body;

    // Sécurité de base
    if (!pseudo) {
      return res.status(400).json({ message: "Le pseudonyme est obligatoire." });
    }

    // 1. Recherche de l'utilisateur (le modèle convertit déjà en minuscules et gère le trim)
    let user = await User.findOne({ pseudo });

    // 2. Si l'utilisateur n'existe pas, on le crée automatiquement (Jalon 3.2)
    if (!user) {
      user = new User({ pseudo, bestScore: 0 });
      await user.save();
    }

    // 3. Génération du Token JWT (valide 2 heures) contenant l'_id et le pseudo (Jalon 3.2)
    const token = jwt.sign(
      { id: user._id, pseudo: user.pseudo },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // 4. Renvoi du token et des infos au client
    return res.status(200).json({
      message: "Authentification réussie",
      token,
      user: {
        id: user._id,
        pseudo: user.pseudo,
        bestScore: user.bestScore
      }
    });

  } catch (error) {
    console.error("❌ Erreur lors du login :", error.message);
    return res.status(500).json({ message: "Erreur serveur lors de l'authentification." });
  }
};