const mongoose = require("mongoose");
const validator = require("validator");
const freelancerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  firstname: {
    type: String,
    required: [true, "Please enter your name"],
  },
  lastname: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    // This only works on CREATE and SAVE!!!
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!!",
    },
  },
  contact: {
    type: Number,
    required: [true, "Contact number is reqired"],
  },
  dateofbirth: {
    type: Date,
    required: true,
  },
  location: [
    {
      place: {
        type: String,
        required: [true, "Enter your place"],
      },
      pincode: {
        type: Number,
        required: [true, "Enter your pincode"],
      },
    },
  ],
  ratings: {
    type: Number,
  },

  earnings: {
    type: Number,
    required: true,
  },
  ReportCard: {
    type: Schema.Types.ObjectId,
    ref: "ReportCard",
  },
});

const Freelancer = mongoose.model("Freelancer", freelancerSchema);

module.exports = Freelancer;
