const cloudinary = require("../middleware/cloudinary");
const Deck = require("../models/Deck");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const decks = await Deck.find({ user: req.user.id });
      res.render("profile.ejs", { decks: decks, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getCards: async (req, res) => {
    try {
      // const post = await Deck.findById({deckId:req.params.id});
      res.render("study.ejs");
    } catch (err) {
      console.log(err);
    }
  },
  createDeck: async (req, res) => {
    try {
      //upload images maybe.
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      await Deck.create({
        title: req.body.title,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        // caption: req.body.caption
        user: req.user.id,
        cards:[]
      });
      console.log("Deck has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  deleteDeck: async (req, res) => {
    try {
      // Find post by id
      let deck = await Deck.findById({ _id: req.params.id });
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Deck.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
