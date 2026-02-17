function authorizeEmployee(req, res, next) {
  if (
    res.locals.loggedin &&
    (res.locals.accountData.account_type === "Employee" ||
     res.locals.accountData.account_type === "Admin")
  ) {
    return next()
  }

  req.flash("notice", "Please log in with an authorized account.")
  res.redirect("/account/login")
}

module.exports = authorizeEmployee
