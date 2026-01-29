const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invController = {}

invController.buildInventoryDetail = async function (req, res) {
  const invId = req.params.invId
  const vehicle = await invModel.getInventoryById(invId)
  const nav = await utilities.getNav()
  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    vehicle,
  })
}

module.exports = invController
