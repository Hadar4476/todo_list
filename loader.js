const { Status } = require("./models/status");

const statusesJSON = require("./statuses.json");

const initStatuses = async () => {
  const statuses = await Status.find();

  if (!statuses.length) {
    await Status.insertMany(statusesJSON);
  }
};

module.exports = { initStatuses };
