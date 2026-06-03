const Question = require('../models/Question');

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    return res.status(200).json(questions);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des questions :", error.message);
    return res.status(500).json({ message: "Erreur serveur lors de la récupération des questions." });
  }
};