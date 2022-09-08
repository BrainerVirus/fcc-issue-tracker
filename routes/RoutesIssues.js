"use strict";
const issueController = require("../controllers/issueController.js");
const projectController = require("../controllers/projectController.js");
const express = require("express");

const routerIssues = express.Router();

routerIssues.get("/issues/:project", projectController.getProjectIssuesByName);
routerIssues.post(
  "/issues/:project",
  issueController.createIssue,
  projectController.checkProjectAndCreateOrUpdate
);
routerIssues.put("/issues/:project", issueController.updateIssue);
routerIssues.delete("/issues/:project", issueController.deleteIssue);

module.exports = routerIssues;
