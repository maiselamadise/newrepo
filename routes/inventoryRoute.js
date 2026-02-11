// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")

// Inventory Management View
router.get("/", utilities.handleErrors(invController.buildManagement))


// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

// Vehicle detail route (REQUIRED)
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildVehicleDetail)
)

// Footer-based error route (REQUIRED)
router.get("/cause-error", (req, res) => {
  throw new Error("Intentional footer-based error")
})

// Add classification (REQUIRED)
router.post(
  "/add-classification",
  utilities.handleErrors(invController.addClassification)
)

// Add vehicle (REQUIRED)
router.post(
  "/add-vehicle",
  utilities.handleErrors(invController.addVehicle)
)


module.exports = router
