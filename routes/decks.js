const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const decksController = require("../controllers/decks");
const cardsController = require("../controllers/cards");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//  Routes
//router.get("/:id", ensureAuth, decksController.getCards);  //getting the cards it goes at deck/id
router.post("/newDeck",   decksController.createDeck);
router.post("/newCard/:id",   cardsController.createCard);
router.delete("/deleteDeck/:id", decksController.deleteDeck);

module.exports = router;
