const mongoose = require("mongoose");
const { array } = require("../middleware/multer");

const cardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
  },back: {
    type: String,
    required: false,
  },codeCard: {
    type: String,
    required: false,
  },mirror: {
    type: String,
    required: false,
  },
   deckId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Deck',
    },
  // image: {
  //   type: String,
  //   require: true,
  // },
  // cloudinaryId: {
  //   type: String,
  //   require: true,
  // },
  // caption: {
  //   type: String,
  //   required: true,
  // },
  // likes: {
  //   type: Number,
  //   required: true,
  // },
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
