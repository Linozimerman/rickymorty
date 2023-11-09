const express = require('express');
const router = express.Router();

const Character = require("../models/character.model")
const Episodes = require("../models/episodes.model")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



/* router.get("/post", (req, res, next) => {
  const allEpisodes = Episodes.find()
    .then((x) => {
      //console.log(allEpisodes)
      //res.send(x)
      return Character.find()
    })
    .then((y) => {
      //console.log(allEpisodes)
      const allCharacters = y;
      //res.send(y)
      res.render("index", { allEpisodes, allCharacters });
      return allCharacters;
    })
    .then((z) => {
    })

    .catch((error) => console.log(error));

}); */



router.get('/post', async (req, res, next)=>{
  try{
    const allEpisodes = await Episodes.find();
    const allCharacters = await Character.find();
    res.render('index', {allEpisodes, allCharacters});
  } catch(error){
    console.log(error)
  }
});






module.exports = router;
