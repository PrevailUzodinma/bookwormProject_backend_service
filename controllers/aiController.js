const AIService = require('../services/aiService');
const aiService = new AIService(process.env.OPENAI_API_KEY);

exports.summarizeText = async (req, res) => {
    try {
        const { text } = req.body;
        const summary = await aiService.summarize(text);
        res.json({ summary });
    } catch (error) {
        console.error('Summarization Error:', error.message);  
        res.status(500).json({ error: 'An error occurred while summarizing the text.' });
    }
};

exports.generateQuiz = async (req, res) => {
    try {
        const { text, difficulty } = req.body;
        const quiz = await aiService.generateQuiz(text, difficulty);
        res.json({ quiz });
    } catch (error) {
        console.error('Quiz Generation Error:', error.message);  
        res.status(500).json({ error: 'An error occurred while generating quiz questions.' });
    }
};
