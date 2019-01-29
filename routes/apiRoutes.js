const axios = require("axios");
const router = require("express").Router();
const db = require("../models")
var newArr= []
const apiKey = "AIzaSyDuLe6erooqM6DzaLkOEiL7d26Wq0SulS0"
router.get("/books", (req, res) => {
  console.log(req.query)
  console.log(req.body)
  console.log(("https://www.googleapis.com/books/v1/volumes?q=" + req.query.q + "&key=" + apiKey))
  axios
    .get("https://www.googleapis.com/books/v1/volumes?q=" + req.query.q  + "&key=" + apiKey, {
    headers: {
      'Content-Type': 'application/json',
  }})
    .then((results) => {
      res.json(results.data);
      for (var i=0; i< results.data.items.length; i++){
        newArr.push(results.data.items[i].volumeInfo)
      }
      console.log(newArr);
      // i tried to find a way to get image url into database easily here, not so easy. can get an async npm to wait for each update... for now i will just manually take out/put in images
      db.Book.create(newArr).then(() => db.Book.update({}, {image : newArr[0].imageLinks.smallThumbnail}, {multi: true}))
    })
    .catch(err => res.status(422).json(err));
});

router.delete("/books/:id", function (req, res) {

  db.Book.findById(req.params.id)
    .remove()
    .then(function (dbBook) {
      res.json(dbBook);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;