const express = require("express")
const router = express.Router()
const accountController = require("../controllers/accountController")
const { checkJWTToken } = require("../utilities/auth")
const validate = require("../utilities/account-validation")

router.get(
  "/",
  checkJWTToken,
  accountController.buildManagement
)

router.get(
  "/update/:accountId",
  checkJWTToken,
  accountController.buildUpdateView
)

router.post(
  "/update",
  validate.updateRules(),
  validate.checkUpdateData,
  accountController.updateAccount
)

router.post(
  "/password",
  validate.passwordRules(),
  validate.checkPasswordData,
  accountController.updatePassword
)

router.get("/logout", (req, res) => {
  res.clearCookie("jwt")
  res.redirect("/")
})

module.exports = router
