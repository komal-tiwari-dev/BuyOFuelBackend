const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  task: { type: String, required: true },
  status: { type: Boolean, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  projectId: { type: String, required: true },
});

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
