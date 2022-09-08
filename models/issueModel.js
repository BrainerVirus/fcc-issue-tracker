const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  issue_title: {
    type: String,
    required: true,
  },
  issue_text: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  assigned_to: {
    type: String,
    default: "",
  },
  status_text: {
    type: String,
    default: "",
  },
  open: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
  updated_on: {
    type: Date,
    default: null,
  },
  deleted_on: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Issue", issueSchema);
