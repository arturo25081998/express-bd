const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    match: RegExp(".*@.*..*"),
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

// Mongoose model : For the model we need the collection's name and the schema

module.exports = mongoose.model("mentors", mentorSchema);
