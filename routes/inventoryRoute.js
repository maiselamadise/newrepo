const express = require("express")
const router = express.Router()

const invController = require("../controllers/invController")
const utilities = require("../utilities")
const { checkEmployeeOrAdmin } = require("../middleware/account-middleware")

router.get(
  "/",
  utilities.checkJWTToken,
  checkEmployeeOrAdmin,
  invController.buildManagement
)

router.get("/type/:classificationId", invController.buildByClassification)
router.get("/detail/:invId", invController.buildDetail)

module.exports = router
