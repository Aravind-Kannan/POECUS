const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  registrationNumber: {
    type: Number,
    required: true,
  },
  form: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  priority1: {
    type: String,
    required: true,
  },
  priority2: {
    type: String,
    required: true,
  },
  priority3: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Response", responseSchema);
