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
        return el === this.password;
      },
      message: "Passwords are not the same!!",
    },
  },
  contact: {
    type: Number,
    required: [true, "Contact number is reqired"],
  },
  jobs_posted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  }],

  ratings: {
    type: Number,
  },
  review: {
    type: String,
  },
  total_amount_paid: {
    type: Number,
    // required: true,
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


const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
