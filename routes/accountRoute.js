const regValidate = require("../utilities/account-validation");

// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");

// Route sent when the "My Account" link is clicked
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route sent when the "My Account" link is clicked
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

// Route to post registration information to database
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Route to post login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLogData,
  utilities.handleErrors(accountController.loginAccount),
);

module.exports = router;
