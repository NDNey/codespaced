const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
  }, back: {
    type: String,
    required: false,
  }, codeCard: {
    type: String,
    required: false,
  }, mirror: {
    type: String,
    required: false,
  }, responses: {
    type: Array,
    required: true,
  },
  studyDate: {
    type: Date,
    default: Date.now,
  },
  hard: {
    type: String,
    default: '6 min',
  }, good: {
    type: String,
    default: '10 min',
  }, easy: {
    type: String,
    default: '4 D',
  },
  deckId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Card", cardSchema);