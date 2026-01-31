/* ******************************************
 * Primary application file (server.js)
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const flash = require("connect-flash")
const messages = require("express-messages")
const cookieParser = require("cookie-parser")
require("dotenv").config()

/* ***********************
 * App Initialization
 *************************/
const app = express()

/* ***********************
 * Middleware
 *************************/
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

/* ***********************
 * Static Files
 *************************/
app.use(express.static("public"))

/* ***********************
 * View Engine Setup
 *************************/
app.set("view engine", "ejs")
app.set("views", "views")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Session Setup
 *************************/
app.use(
  session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET || "superSecret",
    resave: false,
    saveUninitialized: true,
  })
)

/* ***********************
 * Flash Messages
 *************************/
app.use(flash())
app.use((req, res, next) => {
  res.locals.messages = messages(req, res)
  next()
})

/* ***********************
 * Routes
 *************************/
const staticRoutes = require("./routes/static")
const inventoryRoutes = require("./routes/inventoryRoute")
const accountRoutes = require("./routes/accountRoute")

app.use("/", staticRoutes)
app.use("/inv", inventoryRoutes)
app.use("/account", accountRoutes)

/* ***********************
 * Intentional 500 Error Route
 *************************/
app.get("/trigger-error", (req, res, next) => {
  const err = new Error("Intentional Server Error")
  err.status = 500
  next(err)
})

/* ***********************
 * 404 Handler
 *************************/
app.use((req, res, next) => {
  const err = new Error("Sorry, page not found.")
  err.status = 404
  next(err)
})

/* ***********************
 * Error Handler Middleware
 *************************/
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500)
  res.render("errors/error", {
    title: err.status || 500,
    message: err.message,
  })
})

/* ***********************
 * Server Listener (RENDER SAFE)
 *************************/
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`🚀 App running on port ${port}`)
})
