const express = require("express");
const { changePassword } = require("../controllers/usersController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Change password endpoint
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
