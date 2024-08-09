const mongoose = require("mongoose");

const koderSchema = new mongoose.Schema({
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
    require: true,
    match: RegExp(".*@.*..*"),
  },
});

// Mongoose model : For the model we need the collection's name and the schema

module.exports = mongoose.model("koder", koderSchema);
