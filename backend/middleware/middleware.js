const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from Authorization header
  if (!token) return res.status(403).json({ message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; // Attach the userId to the request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
