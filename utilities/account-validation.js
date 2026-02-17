const { body, validationResult } = require("express-validator")
const accountModel = require("../models/accountModel")

function updateAccountRules() {
  return [
    body("account_firstname").trim().notEmpty().withMessage("First name required."),
    body("account_lastname").trim().notEmpty().withMessage("Last name required."),
    body("account_email")
      .isEmail()
      .withMessage("Valid email required.")
      .custom(async (email, { req }) => {
        const account = await accountModel.getAccountByEmail(email)
        if (account && account.account_id != req.body.account_id) {
          throw new Error("Email already exists.")
        }
      })
  ]
}

function passwordRules() {
  return [
    body("account_password")
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
      .withMessage("Password does not meet requirements.")
  ]
}

function checkUpdateData(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render("account/update", {
      title: "Update Account",
      errors: errors.array(),
      ...req.body
    })
  }
  next()
}

function checkPasswordData(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render("account/update", {
      title: "Update Account",
      errors: errors.array(),
      ...req.body
    })
  }
  next()
}

module.exports = {
  updateAccountRules,
  passwordRules,
  checkUpdateData,
  checkPasswordData
}
