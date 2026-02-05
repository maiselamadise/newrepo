const invModel = require("../models/inventory-model")

const Util = {}

/* ****************************************
 * Error handler wrapper
 * **************************************** */
Util.handleErrors = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

/* ****************************************
 * Build navigation HTML
 * **************************************** */
Util.getNav = async function () {
  const data = await invModel.getClassifications()
  let list = "<ul>"

  data.rows.forEach(row => {
    list += `<li>
      <a href="/inventory/type/${row.classification_id}">
        ${row.classification_name}
      </a>
    </li>`
  })

  list += "</ul>"
  return list
}

/* 🚨 THIS LINE MUST BE LAST 🚨 */
module.exports = Util
