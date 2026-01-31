const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invController = {}

invController.getVehicleDetail = async function (req, res, next) {
  try {
    const inv_id = parseInt(req.params.id)
    const vehicle = await invModel.getInventoryById(inv_id)

    if (!vehicle) {
      return next({ status: 404, message: "Vehicle not found" })
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
