const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")

router.get("/detail/:invId", invController.buildInventoryDetail)

module.exports = router
