const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* ***************************
 * Build inventory by classification
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)

    if (!data || data.length === 0) {
      const err = new Error("No vehicles found")
      err.status = 404
      throw err
    }

    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()
    const className = data[0].classification_name

    res.render("inventory/classification", {
      title: `${className} vehicles`,
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Build vehicle detail view
 * ************************** */
invCont.buildVehicleDetail = async function (req, res, next) {
  try {
    const inv_id = parseInt(req.params.invId)
    const vehicle = await invModel.getInventoryById(inv_id)

    if (!vehicle) {
      const err = new Error("Vehicle not found")
      err.status = 404
      throw err
    }

    const detailHTML = await utilities.buildVehicleDetail(vehicle)
    const nav = await utilities.getNav()

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      detailHTML,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = invCont
