const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invController = {}   // 

/* ***************************
 * Build inventory view
 * ************************** */
invController.buildInventory = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/index", {
    title: "Inventory",
    nav,
  })
}

/* ***************************
 * Build inventory by classification view
 * ************************** */
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
 * Build vehicle detail view
 * ************************** */
invController.buildByInvId = async function (req, res, next) {
  const inv_id = Number(req.params.invId)

  if (isNaN(inv_id)) {
    return next({ status: 404, message: "Invalid vehicle ID" })
  }

  const vehicle = await invModel.getVehicleById(inv_id)

  if (!vehicle) {
    return next({ status: 404, message: "Vehicle not found" })
  }

  const nav = await utilities.getNav()
  const detailHTML = utilities.buildVehicleDetail(vehicle)

  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    detailHTML,
  })
}

/* placeholders required by routes */
invController.buildManagement = async function (req, res) {
  res.send("Management works")
}

invController.buildAddClassification = async function (req, res) {
  res.send("Add classification form")
}

invController.addClassification = async function (req, res) {
  res.send("Classification added")
}

module.exports = invController
