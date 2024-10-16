const express = require("express");
const router = express.Router();

const User = require("../model/user.model");

// register new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(200).send({
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    console.error("Failed to register", error);
    res.status(500).send({ message: "Registration failed! " + error.message });
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User is not found!" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    // todo : generate token here

    res.status(200).send({
      message: "Login successful!",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Failed to login", error);
    res.status(500).send({ message: "Login failed! Try again" });
  }
});

module.exports = router;
