const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log("Auth Header:", authHeader); // Debugging

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  const token = authHeader.split(' ')[1];

  try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Verified User:", verified); // Debugging
      req.user = verified;
      next();
  } catch (err) {
      console.error("Token verification failed:", err.message); // Debugging
      res.status(403).json({ message: "Invalid Token" });
  }
};


module.exports = authenticateToken;
