const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

async function buildDetailView(req, res, next) {
  try {
    const invId = Number(req.params.invId)
    const vehicleData = await invModel.getVehicleById(invId)

    if (!vehicleData) {
      return next({ status: 404, message: "Vehicle not found" })
    }

    const nav = await utilities.getNav()
    const htmlContent = utilities.buildInventoryDetail(vehicleData)

    res.render("inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      content: htmlContent,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { buildDetailView }
