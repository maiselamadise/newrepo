const accountModel = require("../models/accountModel")
const bcrypt = require("bcryptjs")

async function buildManagement(req, res) {
  res.render("account/management", {
    title: "Account Management",
    accountData: res.locals.accountData
  })
}

async function buildUpdateView(req, res) {
  const account = await accountModel.getAccountById(req.params.accountId)
  res.render("account/update", {
    title: "Update Account",
    ...account
  })
}

async function updateAccount(req, res) {
  const { account_id, account_firstname, account_lastname, account_email } = req.body

  const result = await accountModel.updateAccount(
    account_id,
    account_firstname,
    account_lastname,
    account_email
  )

  if (!result) {
    req.flash("notice", "Update failed.")
    return res.redirect(`/account/update/${account_id}`)
  }

  const updatedAccount = await accountModel.getAccountById(account_id)
  req.flash("notice", "Account updated successfully.")
  res.render("account/management", {
    title: "Account Management",
    accountData: updatedAccount
  })
}

async function updatePassword(req, res) {
  const { account_id, account_password } = req.body
  const hashedPassword = await bcrypt.hash(account_password, 10)

  const result = await accountModel.updatePassword(account_id, hashedPassword)

  if (!result) {
    req.flash("notice", "Password update failed.")
    return res.redirect(`/account/update/${account_id}`)
  }

  const updatedAccount = await accountModel.getAccountById(account_id)
  req.flash("notice", "Password updated successfully.")
  res.render("account/management", {
    title: "Account Management",
    accountData: updatedAccount
  })
}

function logout(req, res) {
  res.clearCookie("jwt")
  res.redirect("/")
}

module.exports = {
  buildManagement,
  buildUpdateView,
  updateAccount,
  updatePassword,
  logout
}
