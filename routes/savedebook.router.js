const router = require ("express").Router()
const verifyToken = require("../middlewares/verifyToken.middleware.js")
const SavedebookController = require("../controllers/savedebook.controller.js");


// Route to save an ebook
router.post('/save', verifyToken, SavedebookController.saveEbook);

// Route to get saved ebooks for a user
router.get('/saved', verifyToken, SavedebookController.getSavedEbook);

// Route to delete a saved ebook by ID
router.delete('/saved/:id', verifyToken, SavedebookController.deleteSavedEbook);

module.exports = router;
