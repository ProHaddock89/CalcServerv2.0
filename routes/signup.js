const express = require("express");
const { registerUser } = require("../controllers/usersController");

const router = express.Router();

router.post("/register", registerUser);

module.exports = router; // ✅ Ensure you're exporting the router
