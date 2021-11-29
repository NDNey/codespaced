const Card = require("../models/Card");
const schedule = require("./schedule")

module.exports = {
  getCards: async (req, res) => {
    try {
      const allCards = await Card.find({deckId:req.params.id})
      let today = new Date()
      const cards = allCards.filter(e => e.studyDate.getDate() <= today.getDate()  &&  e.studyDate.getMonth() === today.getMonth()  )
      let index = Math.floor(Math.random()*cards.length)
      res.render("study.ejs", { cards: cards,allCards:allCards, user: req.user,index:index });
    } catch (err) {
      console.log(err);
    }
  },
  createCard: async (req, res) => {
    try {
      await Card.create({
        front: req.body.front,
        back: req.body.back,
        codeCard: req.body.codeCard,
        mirror: req.body.mirror,
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
     
      res.redirect(`/study/${req.body.deckId}`);
    } catch (err) {
      console.log(err);
    }
  },studyCard: async (req, res) => {
    
    let updates = await schedule.execute(req.body.responses, req.body.date)
    try {
      await Card.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { 
            responses: req.body.responses,
            studyDate: updates.studyDate,
            hard: updates.hard,
            good: updates.good,
            easy: updates.easy,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
   deleteCard: async (req, res) => {
    try {
      await Card.remove({  _id:req.params.id});
      console.log("Deleted Deck");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
