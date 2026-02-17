const jwt = require("jsonwebtoken")

function checkJWTToken(req, res, next) {
  const token = req.cookies.jwt

  if (!token) {
    res.locals.loggedin = false
    return next()
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    res.locals.loggedin = true
    res.locals.accountData = decoded
    next()
  } catch (err) {
    res.clearCookie("jwt")
    res.locals.loggedin = false
    next()
  }
}

function checkEmployeeOrAdmin(req, res, next) {
  if (
    res.locals.loggedin &&
    (res.locals.accountData.account_type === "Employee" ||
     res.locals.accountData.account_type === "Admin")
  ) {
    return next()
  }

  req.flash("notice", "Please log in with appropriate privileges.")
  res.render("account/login", { title: "Login" })
}

module.exports = {
  checkJWTToken,
  checkEmployeeOrAdmin,
}
