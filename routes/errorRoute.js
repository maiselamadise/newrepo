const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")

router.get(
  "/trigger-error",
  utilities.handleErrors(async () => {
    throw new Error("Intentional 500 Error")
  })
)

module.exports = router
