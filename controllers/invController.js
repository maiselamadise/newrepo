const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)

    if (!data || data.length === 0) {
      return next({ status: 404, message: "No vehicles found" })
    }

    const nav = await utilities.getNav()
    const className = data[0].classification_name

    res.render("inventory/classification", {
      title: `${className} vehicles`,
      nav,
      vehicles: data   // 👈 PASS RAW DATA
    })
  } catch (err) {
    next(err)
  }
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildVehicleDetail = async function (req, res, next) {
  try {
    const inv_id = Number(req.params.inv_id)
    const vehicle = await invModel.getVehicleById(inv_id)

    if (!vehicle) {
      return next({ status: 404, message: "Vehicle not found" })
    }

    const nav = await utilities.getNav()

    res.render("inventory/detail", {
      title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      vehicle   // 👈 PASS DATA, NOT HTML
    })
  } catch (err) {
    next(err)
  }
}

module.exports = invCont
