function checkAccountType(req, res, next) {
  const account = res.locals.accountData

  if (!account || (account.account_type !== "Employee" && account.account_type !== "Admin")) {
    req.flash("notice", "Please log in with an Employee or Admin account.")
    return res.redirect("/account/login")
  }

  next()
}

module.exports = { checkAccountType }
