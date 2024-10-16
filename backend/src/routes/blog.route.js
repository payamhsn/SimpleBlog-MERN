const express = require("express");

const router = express.Router();

const Blog = require("../model/blog.model");

// create a blog post
router.post("/create-post", async (req, res) => {
  try {
    const newPost = new Blog({ ...req.body });
    await newPost.save();
    res.status(201).send({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post: ", error);
    res.status(500).send({ message: "Error creating post. " + error.message });
  }
});

// get all blogs
router.get("/", async (req, res) => {
  try {
    const posts = await Blog.find();
    res.status(200).send(posts);
  } catch (error) {
    console.error("Error fetchin all post: ", error);
    res.status(500).send({ message: "Error fetching all post" });
  }
});

router.get("/", (req, res) => {
  res.send("Hello from blog route");
});

module.exports = router;
