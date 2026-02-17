const express = require("express")
const router = express.Router()
const accountController = require("../controllers/accountController")
const validate = require("../utilities/account-validation")

router.get("/", accountController.buildManagement)

router.get("/update/:accountId", accountController.buildUpdateView)

router.post(
  "/update",
  validate.updateAccountRules(),
  validate.checkUpdateData,
  accountController.updateAccount
)

router.post(
  "/password",
  validate.passwordRules(),
  validate.checkPasswordData,
  accountController.updatePassword
)

router.get("/logout", accountController.logout)

module.exports = router
