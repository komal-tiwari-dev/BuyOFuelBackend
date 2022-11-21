const express = require("express");
const taskModel = require("../model/task.model");

const taskRoute = express.Router();

// TASK ADD ROUTE

taskRoute.post("/:projectId/addtask", async (req, res) => {
  const { task, status } = req.body;
  const projectId = req.params.projectId;
  //   console.log("projectId", projectId);
  const newTask = new taskModel({
    task,
    status,
    projectId,
  });
  await newTask.save();

  res.send({
    message: "Project Task Created Successfully",
    CreatedTask: newTask,
  });
});

// TASK GET ROUTE

taskRoute.get("/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const projects = await taskModel.find({ projectId });

  res.send({ message: "All Task", tasks: projects });
});

// TASK UPDATE ROUTE

taskRoute.patch("/:projectId/update/:taskId", async (req, res) => {
  const { task, status } = req.body;
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;
  const updatedAt = Date.now();

  const updateTask = {
    task,
    status,
    updatedAt: updatedAt,
  };
  const newTask = await taskModel.findOne({ projectId: projectId });
  if (newTask.projectId != projectId) {
    res.send("You are not authorized");
  }
  const updated_task = await taskModel.findOneAndUpdate(
    { _id: taskId },
    updateTask,
    { new: true }
  );

  res.send({
    message: "Successfully Updated Task",
    Updated_task: updated_task,
  });
});

// TASK DELETE ROUTE

taskRoute.delete("/:projectId/delete/:taskId", async (req, res) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;
  const task = await taskModel.findOne({ projectId: projectId });

  if (task.projectId != projectId) {
    res.send("You are not authorized");
  }

  const deleted_task = await taskModel.findOneAndDelete(
    { _id: taskId },
    { new: true }
  );

  res.send({ message: "Successfully deleted", task: deleted_task });
});

// REPORT OF PROJECT

taskRoute.get("/:projectId/report", async (req, res) => {
  const projectId = req.params.projectId;
  const { startDate, endDate } = req.body;
  const report = await taskModel.find({
    projectId: projectId,
    createdAt: { $gte: startDate, $lte: endDate },
  }); //getting total task present in one project

  const completedTask = await taskModel.find({
    projectId: projectId,
    createdAt: { $gte: startDate, $lte: endDate },
    status: true,
  }); //getting total completed task present in one project

  const count = report.length; //getting the count of all task present in one project
  const countCompletedTask = completedTask.length; //getting the count of total completed task

  res.send({
    message: `All Task within ${startDate} and ${endDate}`,
    Task_Within_Date_Range: report,
    totalTask: count,
    CompletedTask: countCompletedTask,
  });
});

module.exports = taskRoute;
