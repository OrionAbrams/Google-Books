import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getBooks: function (query) {
    return axios.get("/api/books", { params: { q: query } });
  },
  // Gets all books
  getAllBooks: function (bookData) {
    return axios.get("/api/books/all", bookData);
  },
  getAllSavedBooks: function (bookData) {
    return axios.get("/api/books/saved/all", bookData);
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (id) {
    return axios.post("/api/books/saved/" + id);
  },
  // Delete all saved books
  deleteSaved: function (bookData) {
    return axios.delete("/api/books/deletesaved/", bookData);
  }
};

