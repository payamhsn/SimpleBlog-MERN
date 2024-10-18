const express = require("express");
const router = express.Router();

const User = require("../model/user.model");
const generateToken = require("../middleware/generateToken");

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

    // generate token here
    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true, // enable this only when you have https://
      secure: true,
      sameSite: "None",
    });

    res.status(200).send({
      message: "Login successful!",
      token,
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

// Logout a user
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send({
      message: "Logged out successfully done!",
    });
  } catch (error) {
    console.error("Failed to log out", error);
    res.status(500).send({ message: "Logout failed!" });
  }
});

module.exports = router;
