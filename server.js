require("dotenv").config()
const express = require("express")
const path = require("path")
const baseController = require("./controllers/baseController")

const app = express()

// Utilities
const utilities = require("./utilities")

// Routes
const inventoryRoute = require("./routes/inventoryRoute")
const errorRoute = require("./routes/errorRoute")

// Middleware
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

// View engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Routes
app.use("/", inventoryRoute)
app.use("/", errorRoute)

// Inventory routes
app.use("/inv", inventoryRoute)

// 404 handler
app.use(async (req, res) => {
  res.status(404).render("error", {
    title: "404 - Page Not Found",
    nav: await utilities.getNav(),
    message: "Sorry, we couldn't find that page.",
  })
})

// Global error handler
app.use(async (err, req, res, next) => {
  console.error(err.stack)

  res.status(err.status || 500).render("error", {
    title: err.status || "Server Error",
    nav: await utilities.getNav(),
    message: err.message || "Something went wrong.",
  })
})

// Server
const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
