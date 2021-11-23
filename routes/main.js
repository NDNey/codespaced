const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const decksController = require("../controllers/decks");
const cardsController = require("../controllers/cards");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/about",ensureAuth, homeController.getAbout);
router.get("/profile", ensureAuth, decksController.getProfile);
router.get("/study/:id", ensureAuth, cardsController.getCards);

 
router.put("/study/edit/:id", ensureAuth,  cardsController.editCard);
router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;


