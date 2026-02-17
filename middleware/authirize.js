function checkEmployeeOrAdmin(req, res, next) {
  if (!res.locals.loggedin) {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }

  const type = res.locals.accountData.account_type
  if (type === "Employee" || type === "Admin") {
    return next()
  }

  req.flash("notice", "You do not have permission to access this area.")
  res.redirect("/account/login")
}

module.exports = { checkEmployeeOrAdmin }
