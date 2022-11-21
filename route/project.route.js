const express = require("express");
const projectModel = require("../model/project.model");

const projectRoute = express.Router();

projectRoute.post("/addproject", async (req, res) => {
  const { projectName, projectType, userId } = req.body;
  console.log("USER Id", userId);
  const newProject = new projectModel({
    projectName,
    projectType,
    userId,
  });
  await newProject.save();
  res.send({ message: "Project Created Successfully", project: newProject });
});
projectRoute.get("/", async (req, res) => {
  const { userId } = req.body;
  const projects = await projectModel.find({ userId });
  res.send({ message: "All projects", project: projects });
});
module.exports = projectRoute;
