const express = require("express")
const router = new express.Router()
const invController = require("../controllers/inventoryController")
const utilities = require("../utilities")
const invCheck = require("../utilities/inventory-validation") 

// Inventory detail route
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildInventoryDetail)
)

module.exports = router
