const jwt = require("jsonwebtoken")

function checkEmployeeOrAdmin(req, res, next) {
  const accountData = res.locals.accountData

  if (
    accountData &&
    (accountData.account_type === "Employee" ||
     accountData.account_type === "Admin")
  ) {
    return next()
  }

  req.flash("notice", "You must be logged in as an employee or admin.")
  return res.redirect("/account/login")
}

module.exports = { checkEmployeeOrAdmin }
