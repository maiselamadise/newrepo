const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")

// Vehicle Detail Route
router.get("/detail/:invId", invController.getVehicleDetail)

module.exports = router
