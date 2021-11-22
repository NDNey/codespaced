const cloudinary = require("../middleware/cloudinary");
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
      console.log("Deck has been added!");
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
      // Find post by id
      // let deck = await Deck.findById({ _id: req.params.id });
      // let cards = await Card.find({deckId:req.params.id})
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      console.log(req.params.id)
      await Deck.remove({ _id: req.params.id });
      await Card.remove({ deckId:req.params.id});
      console.log("Deleted Deck");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
