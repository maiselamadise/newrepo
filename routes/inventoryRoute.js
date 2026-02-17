const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const authorizeEmployee = require("../utilities/authorize")

router.get("/", authorizeEmployee, invController.buildManagement)
router.get("/add-classification", authorizeEmployee, invController.buildAddClassification)
router.post("/add-classification", authorizeEmployee, invController.addClassification)

// 🚧 Not implemented yet
// router.get("/add-inventory", authorizeEmployee, invController.buildAddInventory)
// router.post("/add-inventory", authorizeEmployee, invController.addInventory)

module.exports = router
