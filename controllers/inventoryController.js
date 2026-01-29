const invModel = require("../models/inventory-model")
const utilities = require("../utilities")
const invCont = {}

/* ***************************
 *  Build inventory by classification
 * *************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classificationId = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classificationId)

  const nav = await utilities.getNav()
  const grid = await utilities.buildInventoryGrid(data)
  const classificationName = data[0]?.classification_name || "Classification"

  res.render("inventory/classification", {
    title: `${classificationName} Vehicles`,
    nav,
    grid
  })
}

/* ***************************
 *  Build inventory detail view
 * *************************** */
invCont.buildInventoryDetail = async function (req, res, next) {
  const invId = req.params.invId
  const data = await invModel.getInventoryById(invId)

  const nav = await utilities.getNav()
  const vehicleDetail = await utilities.buildVehicleDetail(data)

  res.render("inventory/detail", {
    title: `${data.inv_make} ${data.inv_model} Details`,
    nav,
    vehicleDetail
  })
}

module.exports = invCont
