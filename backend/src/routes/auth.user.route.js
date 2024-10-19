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

// get all user
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "id email role");
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).send({ message: "Failed to fetch users!" });
  }
});

// delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({
        message: "User is not found!",
      });
    }

    res.status(200).send({
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).send({ message: "Error deleting user!" });
  }
});

// update a user role
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    // todo : check if req dont has role in body.

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      return res.status(404).send({
        message: "User is not found!",
      });
    }

    res.status(200).send({
      message: "User role updated successfully!",
      user,
    });
  } catch (error) {
    console.error("Error updating user role", error);
    res.status(500).send({ message: "Failed updating user role!" });
  }
});

module.exports = router;
