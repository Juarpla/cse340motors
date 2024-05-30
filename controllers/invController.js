const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build item by inventory id view
 * ************************** */
invCont.buildItemByInvId = async function (req, res, next) {
  const inv_id = req.params.invId;
  const data = await invModel.getItemByInvId(inv_id);
  const grid = await utilities.buildItemGrid(data);
  let nav = await utilities.getNav();
  const carTitle = data.inv_year + " " + data.inv_make + " " + data.inv_model;
  res.render("./inventory/detail", {
    title: carTitle,
    nav,
    grid,
  });
};

/* ***************************
 *  Build vehicle management view
 * ************************** */
invCont.buildVehicleManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  const pageTitle = "Vehicle Management";
  res.render("./inventory", {
    title: pageTitle,
    nav,
    errors: null,
  });
};

/* ****************************************
 *  Deliver Add New Classification view
 * *************************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  });
};

/* ****************************************
 *  Deliver Add New Vehicle view
 * *************************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classificationList = await utilities.buildClassificationList();
  res.render("./inventory/add-inventory", {
    title: "Add Vehicle",
    nav,
    errors: null,
    classificationList,
  });
};

/* ****************************************
 *  Process to Add Classification Name
 * *************************************** */
invCont.addClassificationName = async function (req, res) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;

  const classResult = await invModel.registerClassification(classification_name);

  if (classResult) {
    req.flash(
      "notice",
      `Congratulations, ${classification_name} was added as Classification Name.`
    );
    res.status(201).render("./inventory", {
      title: "Vehicle Management",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
    });
  }
};

/* ****************************************
 *  Process to Add New Vehicle
 * *************************************** */
invCont.addNewVehicle = async function (req, res) {
  let nav = await utilities.getNav();
  let classificationList = await utilities.buildClassificationList();
  
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
  } = req.body;

  const new_price = Number(inv_price);
  const new_miles = Number(inv_miles);

  const classResult = await invModel.registerVehicle(
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    new_price,
    inv_year,
    new_miles,
    inv_color
  );

  if (classResult) {
    req.flash(
      "notice",
      `Congratulations, ${inv_make} was added as Classification Name.`
    );
    res.status(201).render("./inventory", {
      title: "Vehicle Management",
      nav,
      classificationList,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      classificationList,
    });
  }
};

module.exports = invCont;