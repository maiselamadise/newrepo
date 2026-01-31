const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invController = {}

invController.buildInventoryDetail = async function (req, res, next) {
  try {
    const invId = parseInt(req.params.invId)
    const vehicle = await invModel.getInventoryById(invId)

    if (!vehicle) {
      const error = new Error("Vehicle not found")
      error.status = 404
      throw error
    }

    const nav = await utilities.getNav()

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      vehicle,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = invController
