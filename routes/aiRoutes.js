const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const validateRequest = require('../middlewares/validateRequest');

router.post('/summarize', validateRequest, aiController.summarizeText);
router.post('/create-quiz', validateRequest, aiController.generateQuiz);

module.exports = router;
