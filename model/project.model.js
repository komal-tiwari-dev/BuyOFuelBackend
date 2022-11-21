const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  projectName: { type: String, require: true },
  projectType: { type: String, require: true },
  userId: { type: String, required: true },
});

const projectModel = mongoose.model("project", projectSchema);

module.exports = projectModel;
