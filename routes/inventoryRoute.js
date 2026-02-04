// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Inventory by classification
router.get("/type/:classificationId", invController.buildByClassificationId)

// Vehicle detail route
router.get("/detail/:invId", invController.buildVehicleDetail)

module.exports = router
