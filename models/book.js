const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  authors: String,
  description: {
    type: String,
    default: "placeholder description"
  },
  image: {
    type: String,
    default: "https://placehold.it/300x300"
  },
  infoLink: {
    type: String,
    default: "https://placehold.it/300x300"
  },
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
