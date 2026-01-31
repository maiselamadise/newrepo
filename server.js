const express = require("express")
const session = require("express-session")
const flash = require("connect-flash")
const messages = require("express-messages")
require("dotenv").config()

const app = express()

/* ***********************
 * View Engine
 *************************/
app.set("view engine", "ejs")
app.set("views", "./views")

/* ***********************
 * Middleware
 *************************/

// Parse form data
app.use(express.urlencoded({ extended: true }))

// Static files
app.use(express.static("public"))

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
)

// Flash messages
app.use(flash())

// Make messages available in all views
app.use((req, res, next) => {
  res.locals.messages = messages(req, res)
  next()
})

/* ***********************
 * Routes
 *************************/
const staticRoutes = require("./routes/static")
const inventoryRoutes = require("./routes/inventoryRoute")

app.use(staticRoutes)
app.use("/inventory", inventoryRoutes)

/* ***********************
 * 404 Handler (AFTER routes)
 *************************/
app.use((req, res, next) => {
  const err = new Error("Page Not Found")
  err.status = 404
  next(err)
})

/* ***********************
 * Global Error Handler (LAST)
 *************************/
const errorHandler = require("./middleware/errorHandler")
app.use(errorHandler)

/* ***********************
 * Server
 *************************/
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
