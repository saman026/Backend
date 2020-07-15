const express = require("express");
const router = express.Router();

//bringing on express-validator for checking
const { check, validationResult } = require("express-validator");

//signout signup coming from controller of auth
const {freelancersignin, freelancersignup, freelancersignout, freelancerisSignedIn, freelancerisAuthenticated,
customersignin, customersignup, customersignout, CustomerisSignedIn, customerisAuthenticated
} = require("../controllers/auth");

//use exp validator in b/w /signup and signup controller using an array
//@name signup
//@route api/auth/freelancer/signup
//@desc for sign up of user
//@type PUBLIC
router.post(
    "/freelancer/signup",
    [
      check("firstname","Name Should be atleast 3 characters.")
        .isLength({ min: 3 })
        ,
      check("email","Email is Required").isEmail(),
      check("encry_password","Password Should be atleast 3 characters.")
        .isLength({ min: 3 })
        ,
        check("contact","Contact No. is not valid.")
        .isLength(10)
    ],
    freelancersignup
  );
  
//@name signin
//@route api/auth/freelancer/signin
//@desc for signing in of user
//@type PUBLIC
  router.post(
    "/freelancer/signin",
    [
      check("email").isEmail().withMessage("Email is Required"),
      check("password")
        .isLength({ min: 3 })
        .withMessage("Password Should be atleast 3 characters."),
    ],
    freelancersignin
  );

//@name signout
//@route api/auth/freelancer/signout
//@desc for signing out of freelancer
//@type PRIVATE
  router.get("/freelancer/signout",freelancerisAuthenticated, freelancersignout);

//@name test
//@route api/auth/freelancer/test
//@desc for testing whether a freelancer is signed in
//@type PUBLIC
router.get("/freelancer/test", freelancerisSignedIn, (req, res) => {
    res.json(req.auth);
  });

module.exports = router;