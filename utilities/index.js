const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list (SAFE FALLBACK)
 ************************** */
Util.getNav = async () => {
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'

  try {
    const data = await invModel.getClassifications()
    data.rows.forEach((row) => {
      list += "<li>"
      list +=
        '<a href="/inv/type/' +
        row.classification_id +
        '" title="See our inventory of ' +
        row.classification_name +
        ' vehicles">' +
        row.classification_name +
        "</a>"
      list += "</li>"
    })
  } catch (error) {
    console.error("⚠️ getNav fallback activated:", error.message)
  }

  list += "</ul>"
  return list
}

/* **************************************
 * Build the classification view HTML
 ************************************* */
Util.buildClassificationGrid = async (data) => {
  let grid = ""

  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach((vehicle) => {
      grid += "<li>"
      grid +=
        '<a href="/inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>'

      grid += '<div class="namePrice">'
      grid += "<hr />"
      grid += "<h2>"
      grid +=
        '<a href="/inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>"
      grid += "</h2>"
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>"
      grid += "</div>"
      grid += "</li>"
    })
    grid += "</ul>"
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }

  return grid
}

/* ***************************
 * Build vehicle detail HTML (Assignment 3)
 ************************** */
Util.buildVehicleDetailHTML = (vehicle) => {
  return `
    <div class="vehicle-detail-container">
      <div class="vehicle-image-section">
        <img 
          src="${vehicle.inv_image}" 
          alt="${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}" 
          class="vehicle-detail-image">
      </div>

      <div class="vehicle-info-section">
        <h1 class="vehicle-title">
          ${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}
        </h1>

        <p class="vehicle-price">
          $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}
        </p>

        <ul class="vehicle-specs">
          <li><strong>Year:</strong> ${vehicle.inv_year}</li>
          <li><strong>Make:</strong> ${vehicle.inv_make}</li>
          <li><strong>Model:</strong> ${vehicle.inv_model}</li>
          <li><strong>Mileage:</strong> ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles</li>
          <li><strong>Color:</strong> ${vehicle.inv_color}</li>
        </ul>

        <h2>Description</h2>
        <p>${vehicle.inv_description}</p>
      </div>
    </div>
  `
}

/* ************************
 * Error handling wrapper
 ************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

/* ************************
 * Build classification select list
 ************************** */
Util.buildClassificationList = async function (classification_id = null) {
  const data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"

  data.rows.forEach((row) => {
    classificationList += `<option value="${row.classification_id}"`
    if (classification_id != null && row.classification_id == classification_id) {
      classificationList += " selected"
    }
    classificationList += `>${row.classification_name}</option>`
  })

  classificationList += "</select>"
  return classificationList
}

/* ****************************************
 * Middleware to check token validity
 **************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      (err, accountData) => {
        if (err) {
          req.flash("notice", "Please log in.")
          res.clearCookie("jwt")
          return res.redirect("/account/login")
        }
        res.locals.accountData = accountData
        res.locals.loggedin = 1
        next()
      }
    )
  } else {
    next()
  }
}

/* ****************************************
 * Check Login
 *************************************** */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
}

/* ****************************************
 * Check Admin or Employee
 **************************************** */
Util.checkAccountType = (req, res, next) => {
  const accountData = res.locals.accountData
  const allowedRoles = ["Admin", "Employee"]

  if (!accountData || !allowedRoles.includes(accountData.account_type)) {
    req.flash("notice", "You do not have access to this page.")
    return res.redirect("/account/login")
  }

  next()
}

module.exports = Util
