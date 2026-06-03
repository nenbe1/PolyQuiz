const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Route GET /api/questions
router.get('/', questionController.getAllQuestions);

module.exports = router;