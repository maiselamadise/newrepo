const express = require("express")
const router = express.Router()
const utilities = require("../utilities")

// Home / index route
router.get("/", async (req, res, next) => {
  try {
    const nav = await utilities.getNav()
    res.render("index", {
      title: "Home",
      nav,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
