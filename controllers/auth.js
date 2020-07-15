//bring in models to save users to db
const User = require("../models/freelancerModel");
const Customer = require('../models/customerModel')
//always create the model const with name as same as it saved in db

//bringing on express-validator for checking
const { check, validationResult } = require("express-validator");
//check is not used here it is used in routes here we will use validation result

//bringing in jsonwebtoken express-jwt tokenize and save in cookie to authenticate user
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

//controlling auth routes in route folder

//@name freelancersignup
//@desc For signup of a freelancer
//@params req,res
exports.freelancersignup = (req, res) => {
  //validationResult binds errors with req
  console.log("hi");
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //status 422 db error throw (Unprocessable Entity)
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    //gives back two para, error and user
    if (err) {

      return res.status(400).json({
        //passing this json to craft a error mesg in front end
        error:
          "The email or mobile is already registered with us, Please try again!",
      });
    }
    res.json({
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
      id: user._id,
      contact: user.contact,
      dateofbirth: user.dateofbirth,
      location: user.location,
      ratings: user.ratings,
      earnings: user.ratings,
      ReportCard: user.ReportCard
    });
  });
};

//@name freelancersignin
//@desc For signing in of a freelancer
//@params req,res
exports.freelancersignin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  console.log(typeof(password))
  if (!errors.isEmpty()) {
    //status 422 db error throw (Unprocessable Entity)
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    // check for both the err and also if email doesnt exist then user doesnt exist
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exists",
      });
    }
    
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password Do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //Send response to frontend
    const { _id, firstname, lastname, email, contact, dateofbirth, location, ratings, earnings, ReportCard} = user;
    return res.json({ token, user: { _id, firstname, lastname, email, contact, dateofbirth, location, ratings, earnings, ReportCard} });
  });
};

//@name freelancersignout
//@desc For signing out of a freelancer
//@params req,res
exports.freelancersignout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

//------------------------------------------------------------------------------------------------------------------------//
//Protected Routes
//@name freelancersignup
//@desc For signup of a freelancer
exports.freelancerisSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//Custom Middlewares
//@name freelancerisAuthenticated
//@desc For authentication of a freelancer
//@params req,res,next
exports.freelancerisAuthenticated = (req, res, next) => {
  //profile will be set from frontend only when the user is logged in and auth is the bearer authentication
  let checker = req.user && req.auth && req.user._id == req.auth._id;
  // req.profile from frontend  req.auth from isSignedIn and  req.profile._id === req.auth._id ids from frontend and backend matches
  if (!checker) {
    //false result
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  //console.log(req.profile);
  next();
};

//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//

//@name customersignup
//@desc For signup of customer
//@params req,res
exports.customersignup = (req, res) => {
    //validationResult binds errors with req
    console.log("hi");
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      //status 422 db error throw (Unprocessable Entity)
      return res.status(422).json({
        error: errors.array()[0].msg,
        param: errors.array()[0].param,
      });
    }
  
    const customer = new Customer(req.body);
    customer.save((err, customer) => {
      //gives back two para, error and user
      if (err) {
  
        return res.status(400).json({
          //passing this json to craft a error mesg in front end
          error:
            "The email or mobile is already registered with us, Please try again!",
        });
      }
      res.json({
        username: customer.username ,
        email: customer.email,
        id: customer._id,
        contact: customer.contact,
        jobs_posted: customer.jobs_posted,
        ratings: customer.ratings,
        review: customer.review,
        total_amount_paid: customer.total_amount_paid
      });
    });
  };
  
//@name customersignin
//@desc For signing in of customer
//@params req,res
  exports.customersignin = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      //status 422 db error throw (Unprocessable Entity)
      return res.status(422).json({
        error: errors.array()[0].msg,
        param: errors.array()[0].param,
      });
    }
  
    Customer.findOne({ email }, (err, customer) => {
      // check for both the err and also if email doesnt exist then user doesnt exist
      if (err || !customer) {
        return res.status(400).json({
          error: "User email does not exists",
        });
      }
  
      if (!customer.authenticate(password)) {
        return res.status(401).json({
          error: "Email and Password Do not match",
        });
      }
  
      //create token
      const token = jwt.sign({ _id: customer._id }, process.env.SECRET);
      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
  
      //Send response to frontend
      const { _id, username, email, contact, jobs_posted, ratings, review, total_amount_paid} = customer;
      return res.json({ token, customer: {_id, username, email, contact, jobs_posted, ratings, review, total_amount_paid} });
    });
  };
  
//@name customersignout
//@desc For signing out of customer
//@params req,res
  exports.customersignout = (req, res) => {
    res.clearCookie("token");
    res.json({
      message: "User signout successfully",
    });
  };
  
  //---------------------------------------------------------------------------------------------------------------------------//
  //Protected Routes
//@name customerisSignedIn
//@desc To check whether a customer is signed in
  exports.CustomerisSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
  });
  
  //Custom Middlewares
//@name customerisAuthenticated
//@desc To check whether a customer is authenticated
//@params req,res, next
  exports.customerisAuthenticated = (req, res, next) => {
    //profile will be set from frontend only when the user is logged in and auth is the bearer authentication
    let checker = req.customer && req.auth && req.customer._id == req.auth._id;
    // req.profile from frontend  req.auth from isSignedIn and  req.profile._id === req.auth._id ids from frontend and backend matches
    if (!checker) {
      //false result
      return res.status(403).json({
        error: "ACCESS DENIED",
      });
    }
    //console.log(req.profile);
    next();
  };
  
  
  