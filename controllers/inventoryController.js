const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

invCont.buildByClassificationId = async function (req, res, next) {
  const nav = await utilities.getNav()
  res.render("inventory/classification", {
    title: "Inventory",
    nav
  })
}

module.exports = invCont
