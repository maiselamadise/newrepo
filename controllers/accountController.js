const accountModel = require("../models/accountModel")
const bcrypt = require("bcryptjs")

async function buildManagement(req, res) {
  res.render("account/management", {
    title: "Account Management",
  })
}

async function buildUpdate(req, res) {
  const account = await accountModel.getAccountById(req.params.accountId)

  res.render("account/update", {
    title: "Update Account",
    ...account,
  })
}

async function updateAccount(req, res) {
  const { firstname, lastname, email, account_id } = req.body

  const result = await accountModel.updateAccount(
    firstname,
    lastname,
    email,
    account_id
  )

  if (!result) {
    req.flash("notice", "Update failed.")
    return res.redirect(`/account/update/${account_id}`)
  }

  const updated = await accountModel.getAccountById(account_id)
  res.locals.accountData = updated
  req.flash("notice", "Account updated successfully.")
  res.render("account/management", { title: "Account Management" })
}

async function updatePassword(req, res) {
  const hashed = await bcrypt.hash(req.body.password, 10)

  const result = await accountModel.updatePassword(
    hashed,
    req.body.account_id
  )

  if (!result) {
    req.flash("notice", "Password update failed.")
    return res.redirect(`/account/update/${req.body.account_id}`)
  }

  req.flash("notice", "Password updated successfully.")
  res.redirect("/account/")
}

function logout(req, res) {
  res.clearCookie("jwt")
  res.redirect("/")
}

module.exports = {
  buildManagement,
  buildUpdate,
  updateAccount,
  updatePassword,
  logout,
}
