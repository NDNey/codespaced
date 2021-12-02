const express = require("express");
const router = express.Router();
const decksController = require("../controllers/decks");
const cardsController = require("../controllers/cards");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//  Routes
router.post("/newDeck", decksController.createDeck);
router.post("/newCard/:id", cardsController.createCard);
router.delete("/deleteCard/:id", cardsController.deleteCard);
router.put("/editDeck/:id", decksController.editDeck);

router.delete("/deleteDeck/:id", decksController.deleteDeck);

module.exports = router;