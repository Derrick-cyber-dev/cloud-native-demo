// middleware/auth.js
// This runs BEFORE any protected route handler

const jwt = require('jsonwebtoken');

const SECRET_KEY = 'cloudnative_secret_2026';

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  // 2. Extract just the token part (remove "Bearer ")
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Token format: Bearer <token>',
    });
  }

  // 3. Verify the token is valid and not expired
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

module.exports = isAuthenticated;
