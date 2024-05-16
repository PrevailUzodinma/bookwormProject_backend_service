const axios = require("axios");
const User = require("../models/user.model");
const Savedebook = require("../models/savedebook.model");
const eBookService = require("../services/ebook.service");

class SavedebookService {
  async saveEbook(id, userId) {
    try {
      const ebook = await eBookService.getBookByID(id);
      const savedebook = await Savedebook.create({
        ebookId: id,
        userId,
        ebook,
      });
      return savedebook;
    } catch (error) {
      throw new Error("Error saving ebook");
    }
  }

  async getSavedEbook(userId) {
    try {
      const ebooks = await Savedebook.find({ userId });
      return ebooks;
    } catch (error) {
      console.log(error);
      throw new Error("Error retrieving user's saved ebooks");
    }
  }
  async getSavedEbookById(id) {
    try {
      const ebook = await Savedebook.findById({_id: id });
      return ebook;
    } catch (error) {

      throw new Error("Error retrieving ebook");
    }
  }

  async deleteSavedEbook(id) {
    try {
      return await Savedebook.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Error deleting saved ebook");
    }
  }
}

module.exports = new SavedebookService();
