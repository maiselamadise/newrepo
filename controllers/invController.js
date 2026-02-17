const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

// ✅ DEFINE CONTROLLER FIRST
const invController = {}

/* ***************************
 * Inventory Home
 * *************************** */
invController.buildInventory = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/index", {
    title: "Inventory",
    nav,
  })
}

/* ***************************
 * Inventory by Classification
 * *************************** */
invController.buildByClassificationId = async function (req, res, next) {
  const classification_id = Number(req.params.classificationId)

  if (isNaN(classification_id)) {
    return next({ status: 404, message: "Invalid classification ID" })
  }

  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  const nav = await utilities.getNav()

  const className = data.length
    ? data[0].classification_name
    : "Vehicles"

  res.render("inventory/classification", {
    title: className,
    nav,
    grid,
  })
}

/* ***************************
 * Inventory Management
 * *************************** */
invController.buildManagement = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
  })
}

/* ***************************
 * Add Classification (GET)
 * *************************** */
invController.buildAddClassification = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 * Add Classification (POST)
 * *************************** */
invController.addClassification = async function (req, res) {
  res.send("Classification added")
}

/* ***************************
 * Add Inventory (GET)
 * *************************** */
invController.buildAddInventory = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    errors: null,
  })
}

/* ***************************
 * Add Inventory (POST)
 * *************************** */
invController.addInventory = async function (req, res) {
  res.send("Inventory item added")
}

// ✅ EXPORT ONCE, AT THE END
module.exports = invController
