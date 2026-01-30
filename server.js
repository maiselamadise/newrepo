/* ******************************************
 * Primary application file (server.js)
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()

/* ***********************
 * Routes
 *************************/
const staticRoutes = require("./routes/static")
const inventoryRoutes = require("./routes/inventoryRoute")
const errorRoute = require("./routes/errorRoute")

/* ***********************
 * Error Handler
 *************************/
const errorHandler = require("./middleware/errorHandler")

/* ***********************
 * View Engine & Layouts
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Middleware
 *************************/
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* ***********************
 * Routes (IMPORTANT ORDER)
 *************************/
app.use("/", staticRoutes)          // Home & static pages
app.use("/inv", inventoryRoutes)    // Inventory routes
app.use("/error", errorRoute)       // Intentional 500 error route

/* ***********************
 * 404 Handler
 *************************/
app.use((req, res, next) => {
  const err = new Error("Page Not Found")
  err.status = 404
  next(err)
})

/* ***********************
 * Global Error Handler (LAST)
 *************************/
app.use(errorHandler)

/* ***********************
 * Server Info
 *************************/
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

/* ***********************
 * Start Server
 *************************/
app.listen(port, host, () => {
  console.log(`App running at http://${host}:${port}`)
})

module.exports = app
