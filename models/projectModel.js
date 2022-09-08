const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
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

module.exports = mongoose.model("Project", projectSchema);
