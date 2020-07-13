const mongoose = require("mongoose");

const validator = require("validator");
const moderatorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
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
  ReportCard: {
    type: Schema.Types.ObjectId,
    ref: "ReportCard",
  },
});
const Moderator = mongoose.model("Moderator", moderatorSchema);

module.exports = Moderator;
