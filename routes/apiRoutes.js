const axios = require("axios");
const router = require("express").Router();
const db = require("../models")

const apiKey = "AIzaSyDuLe6erooqM6DzaLkOEiL7d26Wq0SulS0"
router.get("/books", (req, res) => {
  console.log(req.query)
  console.log(req.body)
  console.log(("https://www.googleapis.com/books/v1/volumes?q=" + req.query.q + "&key=" + apiKey))
  axios
    .get("https://www.googleapis.com/books/v1/volumes?q=" + req.query.q + "&key=" + apiKey, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((results) => {
      var newArr = []
      for (var i = 0; i < results.data.items.length; i++) {
        newArr.push(results.data.items[i].volumeInfo)
      }
      db.Book.remove({}).then(() => {
        // images are in here now but still have to use mongoDB to render things
        db.Book.create(newArr).then(() => {
          
          for (var i = 0; i < newArr.length; i++) {
            if (!newArr[i].imageLinks){
              i++
            }
            db.Book.findOneAndUpdate({'title': newArr[i].title }, {'image': newArr[i].imageLinks.thumbnail}, function (error, found) {
              if (error) {
                console.log(error);
                res.send(error);
              }
              else {
                console.log(found)
              }
            })
          }
        }).then(() => {
            db.Book.find({}).then((data) => {
              // console.log(data)
              res.json(data)
            })
          })
      })
    })
    .catch(err => res.status(422).json(err));
});

router.get("/books/all", (req, res) => {
  db.Book.find({}).then((data) => {
    // console.log(data)
    res.json(data)
  })
})

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

//saveBook pseudocode
// post for /books


// get post request from client 
// get id from request
// find the book with their id by matching
// if not found, send err
// if found, send back successful
// maybe show them in front end alert

// must save book that was found to a favorities database