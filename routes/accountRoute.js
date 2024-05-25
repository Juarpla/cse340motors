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
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;
