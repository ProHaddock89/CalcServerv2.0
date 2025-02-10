const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log("Auth Header Received:", authHeader); // ✅ Debugging

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("❌ No token provided!");
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token Verified:", verified);
        req.user = verified;
        next();
    } catch (err) {
        console.error("❌ Token verification failed:", err); // 🛑 Print full error
        res.status(403).json({ message: "Invalid Token", error: err.message });
    }
};

module.exports = authenticateToken;
