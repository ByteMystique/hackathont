const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Middleman = require("../model/Middleman");

// 🔹 Signup (User or Middleman)
router.post("/signup", async (req, res) => {
  try {
    const { phone, name, role, password, walletAddress } = req.body;

    if (!phone || !name || !role || !password || !walletAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (role === "user") {
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        return res.status(400).json({ message: "Phone number already exists" });
      }

      const newUser = new User({ phone, name, password, walletAddress });
      await newUser.save();
      return res.json({ message: "User created successfully", newUser });
    } else if (role === "middleman") {
      const existingMiddleman = await Middleman.findOne({ phone });
      if (existingMiddleman) {
        return res.status(400).json({ message: "Phone number already exists" });
      }

      const newMiddleman = new Middleman({ phone, name, password, walletAddress });
      await newMiddleman.save();
      return res.json({
        message: "Middleman created successfully",
        newMiddleman,
      });
    }

    res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    res.status(500).json({ message: "Error signing up", error: err.message });
  }
});

// 🔹 Login (Checks Phone and Password)
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone number and password are required" });
    }

    const user = await User.findOne({ phone });
    const middleman = await Middleman.findOne({ phone });

    if (user) {
      // Check password for user
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      return res.json({ message: "User logged in", user });
    }

    if (middleman) {
      // Check password for middleman
      if (middleman.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      return res.json({ message: "Middleman logged in", middleman });
    }

    res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

module.exports = router;