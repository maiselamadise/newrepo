const bcrypt = require("bcryptjs")
const accountModel = require("../models/account-model")

async function buildManagement(req, res) {
  res.render("account/management", {
    title: "Account Management",
    accountData: res.locals.accountData,
    message: req.flash("notice"),
  })
}

async function buildUpdateView(req, res) {
  const account = await accountModel.getAccountById(req.params.accountId)

  res.render("account/update", {
    title: "Update Account",
    ...account,
    errors: null,
    message: null,
  })
}

async function updateAccount(req, res) {
  const { account_id, account_firstname, account_lastname, account_email } = req.body

  await accountModel.updateAccount(
    account_id,
    account_firstname,
    account_lastname,
    account_email
  )

  req.flash("notice", "Account updated successfully.")
  res.redirect("/account/")
}

async function updatePassword(req, res) {
  const { account_id, account_password } = req.body
  const hashedPassword = await bcrypt.hash(account_password, 10)

  await accountModel.updatePassword(account_id, hashedPassword)

  req.flash("notice", "Password updated successfully.")
  res.redirect("/account/")
}

module.exports = {
  buildManagement,
  buildUpdateView,
  updateAccount,
  updatePassword,
}
