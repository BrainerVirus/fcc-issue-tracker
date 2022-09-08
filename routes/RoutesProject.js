"use strict";
const issueController = require("../controllers/issueController.js");
const projectController = require("../controllers/projectController.js");
const express = require("express");

const routerProjects = express.Router();

routerProjects.get("/:project", projectController.getProjectByName);
// routerProjects.post(
//   "/:project",
//   projectController.createProject,
//   issueController.createIssue
// );

module.exports = routerProjects;
