const SavedebookService = require("../services/savedebook.service");

class SavedebookController{

async saveEbook(req, res){
    const {userId} = req.user;
    const savedbook = await SavedebookService.saveEbook(id, userId);
      
      res.status(200).json({
        success: true,
        message: "Ebook saved successfully to this user",
        data: savedbook
      });
    } catch (error) {
      // Handle errors
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
}
async getSavedEbook(req, res){
    const {userId} = req.user;
    const savedbooks = await SavedebookService.getSavedEbook(userId);
      
    if (!savedbooks || savedbooks.length === 0) {
        return res.status(401).json({
          success: false,
          message: "You do not have any ebooks saved",
        });
      }
      res.status(200).json({
        success: true,
        message: "Saved ebooks fetched successfully",
        data: ebooks,
      });
    } catch (error) {
      // Handle errors
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }


async deleteSavedEbook(req, res){
    try {
        const ebookId = req.params.id;
        //Check if the ebook to delete is in the database
        const existingeBook = await SavedebookService.getSavedEbookById(ebookId);
        if (!existingeBook) {
          res.status(403).json({
            success: false,
            message: "saved ebook to delete does not exist",
          });
        }
  
        const deletedeBook = await  SavedebookService.deleteSavedEbook(ebookId);
  
        res.status(200).json({
          success: true,
          message: "saved ebook deleted successfully",
          data: deletedeBook,
        });
      } catch (error) {
        // Handle errors
        console.error("Error creating room:", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }

}
module.exports = new SavedebookController();