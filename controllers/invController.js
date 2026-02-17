const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

/* ***************************
 * Inventory Management View
 * *************************** */
async function buildManagement(req, res) {
  const data = await invModel.getInventoryManagement()

  res.render("inventory/management", {
    title: "Inventory Management",
    data,
  })
}

/* ***************************
 * Inventory by Classification (PUBLIC)
 * *************************** */
async function buildByClassification(req, res) {
  const classificationId = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classificationId)

  res.render("inventory/classification", {
    title: data[0].classification_name,
    data,
  })
}

/* ***************************
 * Inventory Detail View (PUBLIC)
 * *************************** */
async function buildDetail(req, res) {
  const invId = req.params.invId
  const data = await invModel.getInventoryById(invId)

  res.render("inventory/detail", {
    title: `${data.inv_make} ${data.inv_model}`,
    data,
  })
}

module.exports = {
  buildManagement,
  buildByClassification,
  buildDetail,
}
