const cloudinary = require("../middleware/cloudinary");
const Card = require("../models/Cards");

module.exports = {
  createCard: async (req, res) => {
    try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      await Card.create({
        front: req.body.front,
        back: req.body.back,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        // caption: req.body.caption,
        // likes: 0,
        deckId:req.params.id,
        user: req.user.id,
        cards:[]
      });
      console.log("Card has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  }
};
