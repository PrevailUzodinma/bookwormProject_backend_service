const router = require ("express").Router()
const verifyToken = require("../middlewares/verifyToken.middleware.js")
const eBookController = require("../controllers/ebook.controller.js");
const SavedebookController = require("../controllers/savedebook.controller.js");


// Route to search ebooks
router.post('/search', eBookController.searchEbooks);

router.post('/save', verifyToken, SavedebookController.saveEbook);

// Route to get saved ebooks for a user
router.get('/saved', verifyToken, SavedebookController.getSavedEbook);

// Route to delete a saved ebook by ID
router.delete('/saved/:id', verifyToken, SavedebookController.deleteSavedEbook);

// Route to search ebook by id
router.get('/search/:id',eBookController.searchEbooksById);

module.exports = router; 