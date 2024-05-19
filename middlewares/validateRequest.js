const validateRequest = (req, res, next) => {
    const { text, url, difficulty } = req.body;
    if (!text && !url) {
        return res.status(400).json({ error: "Either 'text' or 'url' must be provided." });
    }
    if (difficulty && !['easy', 'medium', 'hard'].includes(difficulty)) {
        return res.status(400).json({ error: "'difficulty' must be one of ['easy', 'medium', 'hard']." });
    }
    next();
};

module.exports = validateRequest;
