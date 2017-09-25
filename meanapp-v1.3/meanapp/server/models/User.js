var mongoose = require('mongoose');

// Create the UserSchema.
var UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Role: {
    type: String,
    required: true
  },
  Department: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  }
});

// Export the model.
module.exports = mongoose.model('user', UserSchema);
