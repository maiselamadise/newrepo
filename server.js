/* *****************************
 *  Required packages
 * **************************** */
require("dotenv").config()
const express = require("express")
const path = require("path")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")

/* *****************************
 *  App setup
 * **************************** */
const app = express()

/* *****************************
 *  Middleware imports
 * **************************** */
const checkJWTToken = require("./utilities/auth")
const { setLocals } = require("./middleware/auth")

/* *****************************
 *  Routes
 * **************************** */
const accountsRouter = require("./routes/accounts")
const inventoryRouter = require("./routes/inventoryRoute")

/* *****************************
 *  View engine (THIS FIXES YOUR ERROR)
 * **************************** */
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

/* *****************************
 *  Global middleware
 * **************************** */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

/* *****************************
 *  Session setup
 * **************************** */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

/* *****************************
 *  JWT + locals middleware (ORDER MATTERS)
 * **************************** */
app.use(checkJWTToken)
app.use(flash())
app.use(setLocals)

/* *****************************
 *  Static files
 * **************************** */
app.use(express.static(path.join(__dirname, "public")))

/* *****************************
 *  Routes
 * **************************** */
app.use("/account", accountsRouter)
app.use("/inventory", inventoryRouter)

/* *****************************
 *  Home route
 * **************************** */
app.get("/", async (req, res) => {
  res.render("index", { title: "Home" })
})

/* *****************************
 *  404 handler
 * **************************** */
app.use((req, res) => {
  res.status(404).render("errors/404", { title: "404 Not Found" })
})

/* *****************************
 *  Server error handler
 * **************************** */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render("errors/500", { title: "Server Error" })
})

/* *****************************
 *  Start server
 * **************************** */
const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`)
})
