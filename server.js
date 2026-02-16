require("dotenv").config()
const express = require("express")
const path = require("path")

const app = express()

// Utilities
const utilities = require("./utilities")

// Routes
const baseRoute = require("./routes/baseRoute")
const inventoryRoute = require("./routes/inventoryRoute")

// Middleware
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

// View engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// ===== ROUTES =====
app.use("/", baseRoute)
app.use("/inv", inventoryRoute)

// ===== 404 HANDLER =====
app.use(async (req, res) => {
  res.status(404).render("errors/error", {
    title: "404 - Page Not Found",
    status: 404,
    nav: await utilities.getNav(),
    message: "Sorry, we couldn't find that page.",
  })
})

// ===== 500 HANDLER (LAST) =====
app.use(async (err, req, res, next) => {
  console.error(err.stack)

  res.status(err.status || 500).render("errors/error", {
    title: err.status || "Server Error",
    status: err.status || 500,
    nav: await utilities.getNav(),
    message: err.message || "Something went wrong.",
  })
})

// Server
const PORT = process.env.PORT || 10000
app.listen(PORT, () => {
  console.log(`🚀 App running on port ${PORT}`)
})

const cookieParser = require("cookie-parser")
const authMiddleware = require("./middleware/auth-middleware")

app.use(cookieParser())
app.use(authMiddleware.checkJWTToken)
