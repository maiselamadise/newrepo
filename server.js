/* ******************************************
 * Primary application file (server.js)
 *******************************************/

const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const flash = require("connect-flash")
require("dotenv").config()

const app = express()

/* ***********************
 * Body Parsing
 *************************/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* ***********************
 * Session
 *************************/
app.use(
  session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(flash())

/* ***********************
 * View Engine (MUST COME EARLY)
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Static Files
 *************************/
app.use(express.static("public"))

/* ***********************
 * Routes
 *************************/
const staticRoutes = require("./routes/static")
const inventoryRoutes = require("./routes/inventoryRoute")

app.use(staticRoutes)
app.use("/inv", inventoryRoutes)

/* ***********************
 * 404 Handler
 *************************/
app.use((req, res, next) => {
  const err = new Error("Page Not Found")
  err.status = 404
  next(err)
})

/* ***********************
 * Error Handler (LAST)
 *************************/
const errorHandler = require("./middleware/errorHandler")
app.use(errorHandler)

/* ***********************
 * Server Listener
 *************************/
const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})
