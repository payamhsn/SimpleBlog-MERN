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
    const { search, category, location } = req.query;
    let query = {};

    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (category) {
      query = {
        ...query,
        category,
      };
    }

    if (location) {
      query = {
        ...query,
        location,
      };
    }

    const posts = await Blog.find(query).sort({ createdAt: -1 });
    res.status(200).send(posts);
  } catch (error) {
    console.error("Error fetchin all post: ", error);
    res.status(500).send({ message: "Error fetching all post" });
  }
});

// get single blog by id
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Blog.findById(postId);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.status(200).send({
      post,
    });
  } catch (error) {
    console.error("Error fetching single post: ", error);
    res
      .status(500)
      .send({ message: "Error fetching single post. " + error.message });
  }
});

// update a blog post
router.patch("/update-post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const updatePost = await Blog.findByIdAndUpdate(
      postId,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!updatePost) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.status(200).send({
      message: "Post updated successfully",
      post: updatePost,
    });
  } catch (error) {
    console.error("Error updating post: ", error);
    res.status(500).send({ message: "Error updating post" });
  }
});

// delete a blog post
router.delete("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Blog.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error fetching single post: ", error);
    res
      .status(500)
      .send({ message: "Error fetching single post. " + error.message });
  }
});

module.exports = router;
