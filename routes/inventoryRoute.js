// Needed Resources
const express = require("express")
const router = express.Router()

const invController = require("../controllers/invController")
const utilities = require("../utilities")

// HOME route
router.get(
  "/",
  utilities.handleErrors(invController.buildHome)
)

// Classification route
router.get(
  "/inventory/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


module.exports = router
