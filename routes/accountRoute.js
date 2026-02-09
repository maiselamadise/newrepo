const express = require("express")
const router = express.Router()
const accountController = require("../controllers/accountController")
const validate = require("../utilities/account-validation")

router.get("/", accountController.buildManagement)

router.get("/update/:accountId", accountController.buildUpdate)

router.post(
  "/update",
  validate.updateRules(),
  validate.checkUpdateData,
  accountController.updateAccount
)

router.post(
  "/update-password",
  validate.passwordRules(),
  validate.checkPassword,
  accountController.updatePassword
)

router.get("/logout", accountController.logout)

module.exports = router
