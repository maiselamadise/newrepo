const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async (req, res) => {
  const nav = await utilities.getNav()
  res.render("index", { title: "Home", nav })
}

baseController.buildCustom = async (req, res) => {
  const nav = await utilities.getNav()
  res.render("custom", { title: "Custom Vehicles", nav })
}

baseController.buildSedan = async (req, res) => {
  const nav = await utilities.getNav()
  res.render("sedan", { title: "Sedans", nav })
}

baseController.buildSuv = async (req, res) => {
  const nav = await utilities.getNav()
  res.render("suv", { title: "SUVs", nav })
}

baseController.buildTruck = async (req, res) => {
  const nav = await utilities.getNav()
  res.render("truck", { title: "Trucks", nav })
}

baseController.buildLogin = async (req, res) => {
  const nav = await utilities.getNav()
  res.render("login", { title: "Login", nav })
}

module.exports = baseController
