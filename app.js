const express = require("express");
const app = express();
const tasksRoute = require("./routes/tasks");
const { connectDb } = require("./db/connect");
const notFound = require("./middleware/not-found");
const dotenv = require("dotenv").config();

const port = 3000;

//middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasksRoute);
app.use(notFound);
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
const start = async () => {
  try {
    await connectDb();
    app;
    app.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
