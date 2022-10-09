const express = require("express");
const router = express.Router();

const { Status } = require("../models/status");

router.get("/", async (req, res) => {
  const statuses = await Status.find();

  res.send(statuses);
});

router.get("/getStatusById", async (req, res) => {
  const { id } = req.query;

  const status = await Status.findById(id);

  res.send(status);
});

module.exports = router;
