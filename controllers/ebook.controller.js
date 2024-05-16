const eBookService = require("../services/ebook.service");

class eBookController {
    async searchEbooks(req, res) {
        try {
          const { search, agent_name_contains, categories } = req.query;
          
          // Construct the params object based on the provided query parameters
          const params = {};
          if (search) params.search = search;
          if (agent_name_contains) params.agent_name_contains = agent_name_contains;
          if (categories) params.categories = categories;
          
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
          return res.status(500).json({
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
        res.status(403).json({
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
