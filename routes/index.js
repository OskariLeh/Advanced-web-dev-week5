var express = require('express');
var mongoose = require('mongoose');
var Food = require("../schemas/food")
var router = express.Router();
var recipes = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/recipe/:food", (req, res, next) => {
  Food.findOne({name: req.params.food}, (err, food) => {
    if(err) {return next(err)}
    if(food) {
      res.send.send(food)
    } else {
      res.status(404).send("not found")
    }
  })
  res.send({"name": req.params.food, "instructions": ["buy", "prepare", "cook", "eat"], "ingredients": [req.params.food, "water", "bananas"]})
})

router.post("/recipe/", (req, res, next) => {
  Food.findOne({name: req.body.name}, (err, food) => {
    if(err) {return next(err)}
    if(!food){
      new Food({
        name: req.body.name,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients
      }).save((err) => {
        if (err) {return next(err)}
        return res.send(req.body)
      })
    }
  })
})

router.post("/images", (req, res) => {
  res.send({"msg": "Hello from /images"})
})

module.exports = router;
