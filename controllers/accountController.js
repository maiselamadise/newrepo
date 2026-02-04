const utilities = require("../utilities")

const accountController = {}

/* ***************************
 * Login View
 * ************************** */
accountController.buildLogin = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null,
  })
}

/* ***************************
 * Register View
 * ************************** */
accountController.buildRegister = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}

module.exports = accountController
