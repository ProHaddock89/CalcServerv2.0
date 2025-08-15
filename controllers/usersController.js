const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
// Add this import for your Asset model
const Asset = require("../models/Asset"); // Adjust path as needed

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Create default assets for new user
    const defaultAssets = [
      {
        userId: user._id,
        title: "NG",
        MT: 0.001,
        TV: 10
      },
      {
        userId: user._id,
        title: "SB",
        MT: 0.01,
        TV: 11.1
      },
      {
        userId: user._id,
        title: "ES",
        MT: 0.25,
        TV: 12.5
      },
      {
        userId: user._id,
        title: "CC",
        MT: 1,
        TV: 10
      },
      {
        userId: user._id,
        title: "LE",
        MT: 0.025,
        TV: 10
      },
      {
        userId: user._id,
        title: "CT",
        MT: 0.01,
        TV: 5
      },
      {
        userId: user._id,
        title: "KC",
        MT: 0.05,
        TV: 18.75
      },
      {
        userId: user._id,
        title: "RTY",
        MT: 0.1,
        TV: 5
      },
      {
        userId: user._id,
        title: "HO",
        MT: 0.0001,
        TV: 4.2
      },
      {
        userId: user._id,
        title: "6E",
        MT: 0.00005,
        TV: 6.25
      },
      {
        userId: user._id,
        title: "ZS",
        MT: 0.25,
        TV: 12.5
      },
      {
        userId: user._id,
        title: "YM",
        MT: 1,
        TV: 5
      },
      {
        userId: user._id,
        title: "NQ",
        MT: 0.25,
        TV: 5
      },
      {
        userId: user._id,
        title: "GF",
        MT: 0.025,
        TV: 12.5
      },
      {
        userId: user._id,
        title: "GC",
        MT: 0.1,
        TV: 10
      },
      {
        userId: user._id,
        title: "ZC",
        MT: 0.25,
        TV: 12.5,
        FracOne: 8,
        FracTwo: 1
      },
      {
        userId: user._id,
        title: "ZB",
        MT: 0.03125,
        TV: 31.25,
        FracOne: 32,
        FracTwo: 1
      },
      {
        userId: user._id,
        title: "ZF",
        MT: 0.0078125,
        TV: 7.81,
        FracOne: 32,
        FracTwo: 256
      },
      {
        userId: user._id,
        title: "6J",
        MT: 5e-7,
        TV: 6.25,
        FracOne: 1,
        FracTwo: 1
      },
      {
        userId: user._id,
        title: "ZT",
        MT: 0.00390625,
        TV: 7.8125,
        FracOne: 32,
        FracTwo: 256
      },
      {
        userId: user._id,
        title: "ZM",
        MT: 0.1,
        TV: 10,
        FracOne: 1,
        FracTwo: 1
      },
      {
        userId: user._id,
        title: "SI",
        MT: 0.005,
        TV: 25,
        FracOne: 1,
        FracTwo: 1
      },
      {
        userId: user._id,
        title: "ZW",
        MT: 0.25,
        TV: 12.5,
        FracOne: 8,
        FracTwo: 1
      }
    ];

    // Save all default assets
    await Asset.insertMany(defaultAssets);

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ 
      message: "User registered successfully with trading instruments", 
      token, 
      user: { id: user._id, name: user.name, email: user.email },
      assetsCreated: defaultAssets.length // Let them know how many assets were created
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password change error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { registerUser, changePassword };