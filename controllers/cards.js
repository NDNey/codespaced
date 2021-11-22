const cloudinary = require("../middleware/cloudinary");
const Card = require("../models/Card");

module.exports = {
  getCards: async (req, res) => {
    try {
      const cards = await Card.find({deckId:req.params.id})
      let index = Math.floor(Math.random()*cards.length)
      res.render("study.ejs", { cards: cards, user: req.user,index:index });
    } catch (err) {
      console.log(err);
    }
  },
  createCard: async (req, res) => {
    try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      await Card.create({
        front: req.body.front,
        back: req.body.back,
        codeCard: req.body.codeCard,
        mirror: req.body.mirror,
     
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        // caption: req.body.caption,
        // likes: 0,
        deckId:req.params.id,
        user: req.user.id,
     
      });
      console.log("Card has been added!");
       
      // return  res.redirect("/profile");
    } catch (err) {
       
      console.log(err);
    }
  }, editCard: async (req, res) => {
 
    try {
      await Card.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: { 
            front: req.body.front ,
            back: req.body.back,
            codeCard: req.body.codeCard,
            mirror: req.body.mirror
          },
        }
      );
     
      res.redirect(`/study/${req.body.deckId }`);
    } catch (err) {
      console.log(err);
    }
  },
   deleteCard: async (req, res) => {
    try {
      // Find post by id
      // let deck = await Deck.findById({ _id: req.params.id });
      // let cards = await Card.find({deckId:req.params.id})
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      // await Deck.remove({ _id: req.params.id });
      await Card.remove({  _id:req.params.id});
      console.log("Deleted Deck");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
