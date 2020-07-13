const mongoose = require("mongoose");

const validator = require("validator");
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your name"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
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
  role: {
    type: String,
    enum: ["admin", "moderator"],
    required: true,
  },
});
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
