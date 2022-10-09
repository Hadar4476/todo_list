const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

exports.Task = Task;
