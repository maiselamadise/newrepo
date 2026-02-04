/* ***************************
 * Utilities
 * ************************** */
const invModel = require("../models/inventory-model")

const utilities = {}

/* ***************************
 * Build Navigation
 * ************************** */
utilities.getNav = async function () {
  const data = await invModel.getClassifications()
  let nav = "<ul>"
  nav += '<li><a href="/" title="Home">Home</a></li>'
  data.rows.forEach((row) => {
    nav += `<li>
      <a href="/inv/type/${row.classification_id}">
        ${row.classification_name}
      </a>
    </li>`
  })
  nav += "</ul>"
  return nav
}

/* ***************************
 * Error handling wrapper
 * ************************** */
utilities.handleErrors = function (fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = utilities
