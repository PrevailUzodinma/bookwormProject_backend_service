const router = require ("express").Router()
const verifyToken = require("../middlewares/verifyToken.middleware.js")
const eBookController = require("../controllers/ebook.controller.js");


router.post('/', eBookController.searchEbooks);
router.get('/:id',eBookController.searchEbooksById)


module.exports = router; 