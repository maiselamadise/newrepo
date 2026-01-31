const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invController = {}

/* ****************************************
 * Build vehicle detail view
 **************************************** */
invController.getVehicleDetail = async function (req, res, next) {
  try {
    const invId = req.params.invId
    const vehicle = await invModel.getInventoryById(invId)

    if (!vehicle) {
      const err = new Error("Vehicle not found")
      err.status = 404
      throw err
    }

    const nav = await utilities.getNav()
    const detailHTML = utilities.buildVehicleDetailHTML(vehicle)

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      detailHTML,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = invController
