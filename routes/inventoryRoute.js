const invValidate = require("../utilities/inventory-validation");

// Needed Resources
const express = require("express");
const utilities = require("../utilities/");

const router = new express.Router();
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);
// Route to build single item view
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildItemByInvId)
);

// Route to build vehicle management view
router.get("/", utilities.handleErrors(invController.buildVehicleManagement));

// Route sent when the "Add New Classification" link is clicked
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
);

// Route sent when the "Add New Vehicle" link is clicked
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
);

// Route to post "Add Classification Name" to database
router.post(
  "/add-classification",
  invValidate.addClassificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassificationName)
);

// Route to post "Add New Vehicle" to database
router.post(
  "/add-inventory",
  invValidate.addInventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addNewVehicle)
);

module.exports = router;
