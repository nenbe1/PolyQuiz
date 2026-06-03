const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: [true, "Le pseudonyme est obligatoire"],
    unique: true,
    trim: true,        // Supprime les espaces au début et à la fin (Jalon 1.2)
    lowercase: true    // Convertit automatiquement en minuscules (Jalon 1.2)
  },
  bestScore: {
    type: Number,
    default: 0         // Par défaut à 0 (Jalon 1.2)
  }
}, {
  timestamps: true     // Option d'ingénierie utile pour suivre les dates
});

module.exports = mongoose.model('User', userSchema);