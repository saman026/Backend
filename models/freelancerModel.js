const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");
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
  encry_password: {
    type: String,
    required: [true, "Password is required"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    // This only works on CREATE and SAVE!!!
    validate: {
      validator: function (el) {
        return el === this.encry_password;
      },
      message: "Passwords are not the same!!",
    },
  },

  //Salt for Passwords
  salt: String, //defined in virtuals
  //Defining Roles
  contact: {
    type: Number,
    required: [true, "Contact number is reqired"],
  },
  dateofbirth: {
    type: Date,
    // required: true,
  },
  location: [
    {
      place: {
        type: String,
        // required: [true, "Enter your place"],
      },
      pincode: {
        type: Number,
        // required: [true, "Enter your pincode"],
      },
    },
  ],
  ratings: {
    type: Number,
  },

  earnings: {
    type: Number,
    // required: true,
  },
  ReportCard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ReportCard",
  },
});

//Virtuals to set password

freelancerSchema
  .virtual("password")
  .set(function (password) {
    //to declare a private variable use _
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

freelancerSchema.methods = {
  //Password authentication check
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  //Password encryption using crypto
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return (plainpassword);
    }
  },
};


const Freelancer = mongoose.model("Freelancer", freelancerSchema);

module.exports = Freelancer;
