const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // 1. Récupération du header Authorization (Format attendu: Bearer <token>)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Accès refusé. Aucun token fourni." }); // (Jalon 3.3)
    }

    // 2. Extraction du token
    const token = authHeader.split(' ')[1];

    // 3. Vérification et décodage du token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. On attache l'utilisateur décodé à l'objet req pour que les contrôleurs suivants y aient accès (Jalon 3.3)
    req.user = decoded;

    // On passe au contrôleur suivant
    next();

  } catch (error) {
    console.error("❌ Erreur de validation du token :", error.message);
    return res.status(401).json({ message: "Token invalide ou expiré." }); // (Jalon 3.3)
  }
};