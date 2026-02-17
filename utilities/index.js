const jwt = require("jsonwebtoken")
const invModel = require("../models/inventory-model")

/* ******************************
 * Build Navigation
 * ***************************** */
async function getNav() {
  const data = await invModel.getClassifications()
  let nav = '<ul>'

  nav += '<li><a href="/" title="Home">Home</a></li>'

  data.rows.forEach((row) => {
    nav += `<li>
      <a href="/inventory/type/${row.classification_id}"
         title="See our inventory of ${row.classification_name} vehicles">
         ${row.classification_name}
      </a>
    </li>`
  })

  nav += '</ul>'
  return nav
}

/* ******************************
 * Error Handler Wrapper
 * ***************************** */
function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

/* ******************************
 * JWT Authentication Middleware
 * ***************************** */
function checkJWTToken(req, res, next) {
  const token = req.cookies.jwt

  if (!token) {
    res.locals.loggedin = 0
    return next()
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    res.locals.accountData = decoded
    res.locals.loggedin = 1
    return next()
  } catch (err) {
    res.clearCookie("jwt")
    res.locals.loggedin = 0
    return next()
  }
}

module.exports = {
  getNav,
  handleErrors,
  checkJWTToken,
}
