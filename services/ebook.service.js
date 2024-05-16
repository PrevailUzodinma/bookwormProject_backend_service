const axios = require("axios");

class eBookService {
  // function to search for ebooks using the Project Gutenberg API
  async searchBooks(params) {
    try {
      console.log(params);
      const response = await axios.get(
        "https://gnikdroy.pythonanywhere.com/api/book/",
        {
          params
        }
      );

      // Extract relevant data from the API response
      const ebooks = response.data.results.map((ebook) => {
        const author = ebook.agents.find(
          (agent) => agent.type === "Author"
        )?.person;
        const thumbnail = ebook.resources.find(
          (resource) => resource.type === "image/jpeg"
        )?.uri;
        const url = ebook.resources.find(
          (resource) => resource.type === "text/html"
        )?.uri;
        return {
          id: ebook.id,
          title: ebook.title,
          description: ebook.description,
          categories: ebook.subjects,
          author,
          thumbnail,
          url,
        };
      });

      return ebooks;
    } catch (error) {
      throw new Error("Error searching ebooks: ", error);
    }
  }

  async getBookByID(id) {
    try {
      const response = await axios.get(
        `https://gnikdroy.pythonanywhere.com/api/book/${id}`
      );
      const ebook = response.data;
      const author = ebook.agents.find(
        (agent) => agent.type === "Author"
      )?.person;
      const thumbnail = ebook.resources.find(
        (resource) => resource.type === "image/jpeg"
      )?.uri;
      const url = ebook.resources.find(
        (resource) => resource.type === "text/html"
      )?.uri;

      return {
        id: ebook.id,
        title: ebook.title,
        description: ebook.description,
        categories: ebook.subjects,
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
