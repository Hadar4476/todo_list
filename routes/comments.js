const express = require("express");
const router = express.Router();

const { Comment } = require("../models/comment");

router.get("/getCommentsByTaskId", async (req, res) => {
  const { taskId } = req.query;

  const comments = await Comment.find({ taskId }).sort({ createdAt: -1 });

  res.send(comments);
});

router.post("/", async (req, res) => {
  const newComment = req.body;

  const comment = await new Comment(newComment).save();

  res.send(comment);
});

module.exports = router;
