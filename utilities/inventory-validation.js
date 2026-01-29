const { body, validationResult } = require("express-validator")

/* **********************************
 * Inventory validation rules
 * ********************************* */
const inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .notEmpty()
      .withMessage("Make is required."),

    body("inv_model")
      .trim()
      .notEmpty()
      .withMessage("Model is required."),

    body("inv_year")
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage("Year must be a valid number."),

    body("inv_description")
      .trim()
      .notEmpty()
      .withMessage("Description is required."),

    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Image path is required."),

    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Thumbnail path is required."),

    body("inv_price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a valid number."),

    body("inv_miles")
      .isInt({ min: 0 })
      .withMessage("Miles must be a valid number."),

    body("classification_id")
      .isInt()
      .withMessage("Classification is required.")
  ]
}

/* **********************************
 * Check validation results
 * ********************************* */
const checkInventoryData = async (req, res, next) => {
  const { errors } = validationResult(req)

  if (!errors.length) {
    return next()
  }

  // Rebuild page with errors
  const utilities = require(".")
  const nav = await utilities.getNav()

  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    errors,
    ...req.body
  })
}

module.exports = {
  inventoryRules,
  checkInventoryData
}
