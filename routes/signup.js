const express = require("express");
const { registerUser } = require("../controllers/usersController");

const router = express.Router();

// Register Route
router.post("/register", registerUser);

module.exports = router;
