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

module.exports = router;
