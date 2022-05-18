const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  membership1: {
    type: Number,
    default: 0
  },
  membership2: {
    type: Number,
    default: 0
  },
  membership3: {
    type: Number,
    default: 0
  },
  patients: {
    type: Number,
    default: 0
  },
  originPassword:{
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
