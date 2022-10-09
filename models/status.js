const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);

exports.Status = Status;
