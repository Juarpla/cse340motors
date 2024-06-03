const accountValidate = require("../utilities/account-validation");

// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");

// Route sent to Account Management View
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountManagement)
);

// Route sent when login link is clicked
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route sent when the "My Account" link is clicked
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

// Route to post registration information to database
router.post(
  "/register",
  accountValidate.registrationRules(),
  accountValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Route to post login attempt
router.post(
  "/login",
  accountValidate.loginRules(),
  accountValidate.checkLogData,
  utilities.handleErrors(accountController.accountLogin)
);

module.exports = router;
