const express = require("express");
const router = express.Router();

const { Task } = require("../models/task");
const { Comment } = require("../models/comment");

router.get("/", async (req, res) => {
  const tasks = await Task.find();

  res.send(tasks);
});

router.post("/", async (req, res) => {
  const newTask = req.body;

  const task = await new Task(newTask).save();

  res.send(task);
});

router.put("/changeStatus", async (req, res) => {
  const { taskId, statusId } = req.body;

  const task = await Task.findByIdAndUpdate(
    { _id: taskId },
    { statusId }
  ).save();

  res.send(task);
});

router.get("/searchTasks", async (req, res) => {
  const { by } = req.query;

  const tasks = await Task.find();

  const regex = new RegExp(by, "i");
  const comments = await Comment.find({ content: { $regex: regex } });

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.includes(by) ||
      t.description.includes(by) ||
      comments.some((c) => c.taskId.toString() === t._id.toString())
  );

  res.send(filteredTasks);
});

module.exports = router;
