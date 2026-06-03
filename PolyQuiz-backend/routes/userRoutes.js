const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importation du garde-barrière (Jalon 3.3)

// Route PROTEGÉE : nécessite un token JWT valide pour poster son score (Jalon 4.2)
router.post('/score', authMiddleware, userController.updateScore);

// Route PUBLIQUE : tout le monde peut voir le top 10 (Jalon 4.3)
router.get('/leaderboard', userController.getLeaderboard);

module.exports = router;