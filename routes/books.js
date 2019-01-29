const router = require("express").Router();
const axios = require("axios");
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

// module.exports = router;
// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
const apiKey = "AIzaSyDuLe6erooqM6DzaLkOEiL7d26Wq0SulS0"
router.get("/books", (req, res) => {
  console.log(("https://www.googleapis.com/books/v1/volumes?q=" + req.query + "&key=" + apiKey))
  axios
    .get("https://www.googleapis.com/books/v1/volumes?q=" + req.query + "&key=" + apiKey)
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

module.exports = router;


