const express = require("express");
require("dotenv").config();
const connect = require("./connection/db");
const Authentication = require("./middleware/authentication");
const userRoute = require("./route/user.route");
const projectRoute = require("./route/project.route");
const taskRoute = require("./route/task.route");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("/Home");
});

app.use(Authentication);
app.use("/user", userRoute); //login and register endpoint of user
app.use("/project", projectRoute); //create and read endpoint for project
app.use("/task", taskRoute); // create, read, update, delete and report endpoint for tasks of single project.

app.listen(process.env.PORT, async () => {
  try {
    await connect;
    console.log("Databse connected successfully");
  } catch (err) {
    console.log("error in connecting db", err);
  }
  console.log(`Server running on port 8000`);
});
