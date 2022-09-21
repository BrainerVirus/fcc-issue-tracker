const issueModel = require("../models/issueModel.js");

const createIssue = async (req, res, next) => {
  try {
    const info = {
      issue_title: req.body.issue_title,
      issue_text: req.body.issue_text,
      created_by: req.body.created_by,
      assigned_to: req.body.assigned_to,
      status_text: req.body.status_text,
    };
    if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by)
      return res.status(200).json({ error: "required field(s) missing" });
    const issue = await issueModel.create(info);
    req.issue = issue;
    next();
    // res.status(200).json({ message: "Issue created" });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

const getIssuesById = async (req, res) => {
  try {
    const issues = await issueModel
      .findById(req.body._id)
      .where("isDeleted")
      .equals(false);
    res.status(200).json(issues);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

const getIssues = async (req, res) => {
  try {
    const issues = await issueModel.find().where("isDeleted").equals(false);
    res.status(200).json(issues);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

const updateIssue = async (req, res, next) => {
  try {
    const info = {
      issue_title: req.body.issue_title,
      issue_text: req.body.issue_text,
      created_by: req.body.created_by,
      assigned_to: req.body.assigned_to,
      status_text: req.body.status_text,
      open: req.body.open,
      updated_on: Date.now().toString(),
    };
    const issue = await issueModel
      .findById(req.body._id)
      .where("isDeleted")
      .equals(false);
    if (!req.body._id) return res.status(200).json({ error: "missing _id" });
    if (
      !req.body.issue_title &&
      !req.body.issue_text &&
      !req.body.created_by &&
      !req.body.open &&
      !req.body.assigned_to &&
      !req.body.status_text
    )
      return res.json({ error: "no update field(s) sent", _id: req.body._id });

    if (!req.body.issue_title) info.issue_title = issue.issue_title;
    if (!req.body.issue_text) info.issue_text = issue.issue_text;
    if (!req.body.created_by) info.created_by = issue.created_by;
    if (!req.body.open) info.open = issue.open;
    if (!req.body.assigned_to) info.assigned_to = issue.assigned_to;
    if (!req.body.status_text) info.status_text = issue.status_text;

    const updatedIssue = await issueModel
      .findByIdAndUpdate(req.body._id, info)
      .where("isDeleted")
      .equals(false);
    res.status(200).json({ result: "successfully updated", _id: req.body._id });
  } catch (error) {
    res.status(200).json({ error: "could not update", _id: req.body._id });
  }
};

const deleteIssue = async (req, res) => {
  try {
    if (!req.body._id) return res.status(200).json({ error: "missing _id" });
    const info = {
      isDeleted: true,
      deleted_on: Date.now().toString(),
    };
    const issueToDelete = await issueModel
      .find(req.body._id)
      .where("isDeleted")
      .equals(false);
    if (!issueToDelete)
      return res
        .status(200)
        .json({ error: "could not delete", _id: req.body._id });
    await issueModel
      .findByIdAndUpdate(req.body._id, info)
      .where("isDeleted")
      .equals(false);
    res.status(200).json({ result: "successfully deleted", _id: req.body._id });
  } catch (error) {
    res.status(200).json({ error: "could not delete", _id: req.body._id });
  }
};

module.exports = {
  createIssue,
  getIssuesById,
  getIssues,
  updateIssue,
  deleteIssue,
};
