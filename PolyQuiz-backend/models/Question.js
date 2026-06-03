const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "La catégorie est obligatoire"] // Ex: "F1", "Manga" (Jalon 1.3)
  },
  text: {
    type: String,
    required: [true, "Le libellé de la question est obligatoire"] // (Jalon 1.3)
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(val) {
        return val.length >= 2 && val.length <= 4; // Minimum 2, maximum 4 (Jalon 1.3)
      },
      message: "Une question doit avoir entre 2 et 4 options."
    }
  },
  correctAnswer: {
    type: String,
    required: [true, "La bonne réponse est obligatoire"] // (Jalon 1.3)
  }
});

module.exports = mongoose.model('Question', questionSchema);