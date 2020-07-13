const mongoose = require("mongoose");

const validator = require("validator");
const customerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
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
  jobs_posted: {
    type: Schema.Types.ObjectId,
    ref: "Job",
  },

  ratings: {
    type: Number,
  },
  review: {
    type: String,
  },
  total_amount_paid: {
    type: Number,
    required: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
