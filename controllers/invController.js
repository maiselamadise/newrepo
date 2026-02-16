const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

async function buildByClassificationId(req, res, next) {
  const classificationId = Number(req.params.classificationId)
  const data = await invModel.getInventoryByClassificationId(classificationId)

  const nav = await utilities.getNav()
  const className = data[0]?.classification_name || "Vehicles"

  res.render("inventory/classification", {
    title: className,
    nav,
    vehicles: data
  })
}

async function buildDetailView(req, res, next) {
  const invId = Number(req.params.invId)
  const vehicle = await invModel.getVehicleById(invId)

  if (!vehicle) {
    return next({ status: 404, message: "Vehicle not found" })
  }

  const nav = await utilities.getNav()

  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    vehicle
  })
}

async function buildManagementView(req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav
  })
}

module.exports = {
  buildByClassificationId,
  buildDetailView,
  buildManagementView
}
