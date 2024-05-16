const axios = require("axios");

class eBookService {
  // function to search for ebooks using the Project Gutenberg API
  async searchBooks(params) {
    try {
      // Send a request to the Google Books API
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params,
          key: process.env.API_KEY,
        }
      );

      // Extract relevant data from the API response
      const ebooks = response.data.items.map((item) => {
        const volumeInfo = item.volumeInfo;
        return {
          id: item.id,
          title: volumeInfo.title,
          description: volumeInfo.description || "no description available",
          categories: volumeInfo.categories || [],
          author: volumeInfo.authors
            ? volumeInfo.authors.join(", ")
            : "Unknown",
          thumbnail: volumeInfo.imageLinks
            ? volumeInfo.imageLinks.thumbnail
            : null,
          url: volumeInfo.previewLink,
        };
      });

      return ebooks;
    } catch (error) {
      throw new Error("Error searching ebooks: ", error);
    }
  }

  async getBookByID(id) {
    try {
      // Send a request to the Google Books API to get the book by ID
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}/${process.env.API_KEY}`
      );
      const ebook = response.data.volumeInfo;

      // Extract relevant data from the API response
      const author = ebook.authors ? ebook.authors.join(", ") : "Unknown";
      const thumbnail = ebook.imageLinks ? ebook.imageLinks.thumbnail : null;
      const url = ebook.previewLink;

      return {
        id: response.data.id,
        title: ebook.title,
        description: ebook.description || "no description",
        categories: ebook.categories || [],
        author,
        thumbnail,
        url,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching book details:");
    }
  }
}

module.exports = new eBookService();
