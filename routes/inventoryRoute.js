const express = require("express")
const router = express.Router()
const { checkAccountType } = require("../middleware/account-type")

router.get("/management", checkAccountType, invController.buildManagement)
router.get("/add-classification", checkAccountType, invController.buildAddClassification)
router.post("/add-classification", checkAccountType, invController.addClassification)

module.exports = router
