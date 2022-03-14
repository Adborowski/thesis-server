const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
      type: String,
      required: [true, 'A user must have an email']
  },
  picture: {
    type: String,
    required: [true, 'A user must have an email']
}
});

// Create model for todo
const User = mongoose.model('user', UserSchema);

module.exports = Task;