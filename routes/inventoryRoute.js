const express = require("express")
const router = express.Router()

const inventoryController = require("../controllers/inventoryController")
const utilities = require("../utilities")

// HOME route (THIS WAS MISSING)
router.get(
  "/",
  utilities.handleErrors(inventoryController.buildHome)
)

// Classification route
router.get(
  "/inventory/type/:classificationId",
  utilities.handleErrors(inventoryController.buildByClassificationId)
)

module.exports = router
