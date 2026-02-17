const jwt = require("jsonwebtoken")

function checkJWTToken(req, res, next) {
  const token = req.cookies.jwt

  if (!token) {
    res.locals.loggedin = false
    return next()
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, accountData) => {
    if (err) {
      res.locals.loggedin = false
      return next()
    }

    res.locals.loggedin = true
    res.locals.accountData = accountData
    next()
  })
}

module.exports = checkJWTToken
