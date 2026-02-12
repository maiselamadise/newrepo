const express = require("express")
const router = express.Router()

const baseController = require("../controllers/baseController")
const utilities = require("../utilities")

router.get(
  "/",
  utilities.handleErrors(baseController.buildHome)
)

router.get(
  "/vehicles/custom",
  utilities.handleErrors(baseController.buildCustom)
)

router.get(
  "/vehicles/sedan",
  utilities.handleErrors(baseController.buildSedan)
)

router.get(
  "/vehicles/suv",
  utilities.handleErrors(baseController.buildSuv)
)

router.get(
  "/vehicles/truck",
  utilities.handleErrors(baseController.buildTruck)
)

router.get(
  "/account/login",
  utilities.handleErrors(baseController.buildLogin)
)

module.exports = router
