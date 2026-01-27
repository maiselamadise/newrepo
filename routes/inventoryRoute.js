const express = require("express")
const router = new express.Router()
const invController = require("../controllers/inventoryController")
const utilities = require("../utilities")

// Inventory detail route
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildInventoryDetail)
)

module.exports = router
