const eBookService = require("../services/ebook.service");

class eBookController {
  async searchEbooks(req, res) {
    try {
      // Destructure the request query to extract every query passed
      const { q, keyword, author, categories } = req.query;

      // Construct the params object based on the provided query parameters
      const params = {};
      if (q) params.q = q;

      let queryString = "";
      if (keyword) {
        queryString += `intitle:${keyword} `;
      }
      if (author) {
        queryString += `inauthor:${author} `;
      }
      if (categories) {
        queryString += `subject:${categories} `;
      }

      // Append the additional qualifiers to the general search query
      if (queryString) {
        params.q = queryString.trim();
      }
      // Assuming eBookService.searchBooks can handle an object of query parameters
      const ebooks = await eBookService.searchBooks(params);
      if (!ebooks || ebooks.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Oops! The ebooks you searched for are not available",
        });
      }
      res.status(200).json({
        success: true,
        message: "Ebooks fetched successfully",
        data: ebooks,
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async searchEbooksById(req, res) {
    try {
      const { id } = req.params;
      const ebook = await eBookService.getBookByID(id);
      if (!ebook) {
        return res.status(404).json({
          success: false,
          message: "Oops! This ebook is not available",
        });
      }
      res.status(200).json({
        message: "ebook fetched successfully",
        data: ebook,
      });
    } catch (error) {
      // Handle errors
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = new eBookController();
