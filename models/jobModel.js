const mongoose = require("mongoose");

const validator = require("validator");
const jobSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "A job must have a type"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "A job must have a description"],
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  deadline: [
    {
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: Date,
        required: true,
      },
    },
  ],
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
