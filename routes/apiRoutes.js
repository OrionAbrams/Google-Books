const axios = require("axios");
const router = require("express").Router();

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
    .then((results) => console.log(res.json(results.data)))
    // .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

module.exports = router;