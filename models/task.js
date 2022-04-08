const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for todo
const TaskSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  ownerId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: [true, "A task must have a title"],
  },
  reward: {
    type: Number,
    required: [true, "A task must have a reward"],
  },
  description: {
    type: String,
    required: [true, "A task must have a description"],
  },
  latlng: {
    type: [Number],
    required: [true, "There must be a location"],
  },
  media: {
    type: [String],
    required: [true, "There must be media"],
  },
});

// Create model for todo
const Task = mongoose.model("task", TaskSchema);

module.exports = Task;
