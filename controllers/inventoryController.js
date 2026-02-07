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

if (!errors.isEmpty()) {
  const classifications = await invModel.getClassifications()

  res.render("inventory/add-inventory", {
    title: "Add Vehicle",
    classifications: classifications.rows,
    errors: errors.array(),
    classification_id: req.body.classification_id, // 👈 THIS
    inv_make: req.body.inv_make,
    inv_model: req.body.inv_model,
    inv_year: req.body.inv_year,
    inv_price: req.body.inv_price,
    inv_mileage: req.body.inv_mileage,
    inv_color: req.body.inv_color,
    inv_description: req.body.inv_description
  })
  return
}


module.exports = { buildDetailView }
