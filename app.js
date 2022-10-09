const dotENV = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const path = require("path");

const { initStatuses } = require("./loader");

const tasks = require("./routes/tasks");
const comments = require("./routes/comments");
const statuses = require("./routes/statuses");

dotENV.config();

mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? "mongodb+srv://hadar4476:hadar123456@cluster0.tcbkqze.mongodb.net/?retryWrites=true&w=majority"
      : process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    initStatuses();

    console.log("Connected to mongodb database: todo_list successfully.");
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());

app.use("/tasks", tasks);
app.use("/comments", comments);
app.use("/statuses", statuses);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT;

http.listen(PORT, () => {
  console.log(`NodeJS server started at port ${PORT}.`);
});
