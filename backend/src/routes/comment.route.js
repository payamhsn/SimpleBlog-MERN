const express = require("express");
const Comment = require("../model/comment.model");
const router = express.Router();

// create a comment
router.post("/post-comment", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(200).send({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("An error occured while posting new comment: ", error);
    res
      .status(500)
      .send({ message: "An error occured while posting new comment" });
  }
});

// get all comments count
router.get("/total-comments", async (req, res) => {
  try {
    const totalComments = await Comment.countDocuments({});
    res.status(200).send({ totalComments });
  } catch (error) {
    console.error("An error occured while getting comment count: ", error);
    res
      .status(500)
      .send({ message: "An error occured while getting comment count" });
  }
});

module.exports = router;
