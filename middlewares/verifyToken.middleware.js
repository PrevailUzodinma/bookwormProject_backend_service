const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Extract token from headers, cookies, or request body
  const token = req.headers.authorization || req.cookies.token || req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.MY_SECRET_KEY_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded; // Attach decoded user information to request object
    next(); // Proceed to the next middleware
  });
};

module.exports = verifyToken;