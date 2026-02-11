const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

/* ***************************
 *  Build vehicle detail view
 * ************************** */
async function buildVehicleDetail(req, res, next) {
  try {
    const invId = Number(req.params.inv_id)

    const vehicleData = await invModel.getVehicleById(invId)

    if (!vehicleData) {
      return next({ status: 404, message: "Vehicle not found" })
    }

    const nav = await utilities.getNav()

    res.render("inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      vehicle: vehicleData   // 👈 PASS DATA, NOT HTML
    })
  } catch (error) {
    next(error)
  }
}
