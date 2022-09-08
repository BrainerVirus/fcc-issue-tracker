const projectModel = require("../models/projectModel.js");

const createProject = async (req, res) => {
  try {
    const info = {
      name: req.params.project,
      issues: [req.issue],
    };
    await projectModel.create(info);
    res.status(200).json(req.issue);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getProjectByName = async (req, res) => {
  try {
    const project = await projectModel
      .find({ name: req.params.project })
      .where("isDeleted")
      .equals(false);
    res.status(200).json(project[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectIssuesByName = async (req, res) => {
  try {
    const query = req.query;
    query.name = req.params.project;
    const project = await projectModel
      .find(query)
      .where("isDeleted")
      .equals(false)
      .populate({
        path: "issues",
        match: query,
      });
    res
      .status(200)
      .json(project[0].issues.filter((issue) => issue.isDeleted === false));
  } catch (error) {
    res.status(500).json({ message: "The project does not exist" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const issues = [...req.issuesArray];
    issues.push(req.issue);
    const info = {
      name: req.body.name,
      issues: issues,
      updated_on: Date.now(),
    };
    const project = await projectModel
      .findByIdAndUpdate(req.projectId, info)
      .where("isDeleted")
      .equals(false)
      .populate("issues");
    res.status(200).json(req.issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkProjectAndCreateOrUpdate = async (req, res) => {
  try {
    const project = await projectModel
      .find({ name: req.params.project })
      .where("isDeleted")
      .equals(false);
    if (project.length === 1) {
      req.issuesArray = project[0].issues;
      req.projectId = project[0]._id;
      updateProject(req, res);
    }
    if (project.length === 0) {
      createProject(req, res);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjectByName,
  getAllProjects,
  checkProjectAndCreateOrUpdate,
  updateProject,
  getProjectIssuesByName,
};
