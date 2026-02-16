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
  } catch (err) {
    res.locals.loggedin = false
  }
  next()
}

module.exports = { checkJWTToken }
