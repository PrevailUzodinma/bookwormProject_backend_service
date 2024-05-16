const router = require ("express").Router()
const verifyToken = require("../middlewares/verifyToken.middleware.js")
const SavedebookController = require("../controllers/savedebook.controller.js");


// Route to save an ebook
router.post('/save', SavedebookController.saveEbook);

// Route to get saved ebooks for a user
router.get('/saved', SavedebookController.getSavedEbook);

// Route to delete a saved ebook by ID
router.delete('/saved/:id', SavedebookController.deleteSavedEbook);

module.exports = router;
