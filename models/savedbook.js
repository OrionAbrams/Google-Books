const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedbookSchema = new Schema({
  title: String,
  authors: {
    type: String,
    default: "unlisted"
  },
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
    default: "https://placehold.it/300x300",
    unique: true
  },
  date: { type: Date, default: Date.now }
});

const Savedbook = mongoose.model("Savedbook", savedbookSchema);

module.exports = Savedbook;
