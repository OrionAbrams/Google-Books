const axios = require("axios");
const router = require("express").Router();
const db = require("../models")
const apiKey = "AIzaSyDuLe6erooqM6DzaLkOEiL7d26Wq0SulS0"
var usableObject

function queryGoogleBooks(query) {
  return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&key=" + apiKey, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
// This route takes in the search from user form input
// finds 10 books from google api using that input
// puts the books in mongoDB
// returns the books to be rendered
router.get("/books", (req, res) => {
  const googleSearchTerm = req.query.q
  queryGoogleBooks(googleSearchTerm)
    .then((results) => {
      var newArr = []
      for (var i = 0; i < results.data.items.length; i++) {
        newArr.push(results.data.items[i].volumeInfo)
      }
      db.Book.remove({})
        .then(() => db.Book.create(newArr))
        .then(() => {
          //trying to make an undefined image in mongoose breaks whole app, so this skips past books apis without images
          for (var i = 0; i < newArr.length; i++) {
            if (!newArr[i].imageLinks) {
              return
            }
            db.Book.findOneAndUpdate({ 'title': newArr[i].title }, { 'image': newArr[i].imageLinks.thumbnail })
              .then((found) => {
                console.log(found)
              })
          }
        }).then(() => {
          db.Book.find({}).then((data) => {
            res.json(data)
          })
        })
    })
    .catch(err => res.status(422).json(err));
});

router.get("/books/all", (req, res) => {
  db.Book.find({}).then((data) => {
    res.json(data)
  })
})

router.get("/books/saved/all", (req, res) => {
  db.Savedbook.find({}).then((data) => {
    console.log(data)
    res.json(data)
  })
})

router.delete("/books/deletesaved", (req, res) => {
  db.Savedbook.remove({}).then((data) => {
    console.log(data)
    res.json(data)
  })
})

router.post("/books/saved/:id", function (req, res) {
  db.Book.findById(req.params.id)
    .then((dbBook) => {
      var dupeArr = []
      usableObject = {
        authors: dbBook.authors,
        description: dbBook.description,
        title: dbBook.title,
        image: dbBook.image,
        infoLink: dbBook.infoLink
      }
    })
    .then(() => {
      console.log(usableObject)
      db.Savedbook.create(usableObject)
    }).then(function (dbBook) {
      res.json(dbBook);
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

router.delete("/books/saved/:id", function (req, res) {

  db.Savedbook.findById(req.params.id)
    .remove()
    .then(function (dbBook) {
      res.json(dbBook);
    })
    .catch(function (err) {
      res.json(err);
    });
});


module.exports = router;