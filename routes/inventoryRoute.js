const express = require("express")
const router = express.Router()
const { checkAccountType } = require("../middleware/account-type")

const invController = require("../controllers/inventoryController")

router.get("/type/:classificationId", invController.buildByClassificationId)
router.get("/detail/:invId", invController.buildByInvId)
router.get("/management", checkAccountType, invController.buildManagement)
router.get("/add-classification", checkAccountType, invController.buildAddClassification)
router.post("/add-classification", checkAccountType, invController.addClassification)

router.get("/", invController.buildInventory);

module.exports = router
