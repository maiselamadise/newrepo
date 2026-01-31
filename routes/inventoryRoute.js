const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")

router.get("/detail/:id", invController.getVehicleDetail)

module.exports = router
