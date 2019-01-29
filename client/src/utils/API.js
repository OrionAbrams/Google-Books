import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
const apiKey = "AIzaSyDuLe6erooqM6DzaLkOEiL7d26Wq0SulS0"
export default {
  getRecipes: function(query) {
    return axios.get("/api/books", { params: { q: query } });
  }
};
