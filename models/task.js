const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A task must have a title'],
  },
  reward: {
      type: Number,
      required: [true, 'A task must have a reward']
  },
  latlng: {
    type: [Number],
    required: [true, 'There must be a location']
  }
});

// Create model for todo
const Task = mongoose.model('task', TaskSchema);

module.exports = Task;