const axios = require('axios');

class AIService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'https://api.openai.com/v1/completions';
        this.model = 'gpt-3.5-turbo-instruct'; 
    }

    async summarize(text) {
        try {
            const response = await axios.post(this.apiUrl, {
                prompt: `Summarize this text:\n\n${text}\n\nSummary:`,
                max_tokens: 150,
                model: this.model,
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'OpenAI-Beta': 'assistants=v1',
                }
            });

            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error during summarization request:', error.response ? error.response.data : error.message);
            throw new Error('Failed to summarize text');
        }
    }

    async generateQuiz(text, difficulty) {
        try {
            const response = await axios.post(this.apiUrl, {
                prompt: `Generate ${difficulty} level quiz questions based on the following text:\n\n${text}\n\nQuestions:`,
                max_tokens: 150,
                model: this.model,
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'OpenAI-Beta': 'assistants=v1',
                }
            });

            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error during quiz generation request:', error.response ? error.response.data : error.message);
            throw new Error('Failed to generate quiz');
        }
    }
}

module.exports = AIService;
