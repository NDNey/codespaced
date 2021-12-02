const Deck = require("../models/Deck");
const Card = require("../models/Card")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const decks = await Deck.find({ user: req.user.id });
      res.render("profile.ejs", { decks: decks, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },createDeck: async (req, res) => {
    try {
      await Deck.create({
        title: req.body.title,
        user: req.user.id,
        cards:[]
      });
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  editDeck: async (req, res) => {
    console.log(req.body)
    try {
      await Deck.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { title: req.body.NewDeckName },
        }
      );
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteDeck: async (req, res) => {
    try {
      await Deck.deleteOne({ _id: req.params.id });
      await Card.deleteOne({ deckId:req.params.id});
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
