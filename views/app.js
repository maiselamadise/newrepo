const express = require("express")
const path = require("path")

const app = express()

/* ===============================
   1️⃣ STATIC FILES (PUT HERE)
   =============================== */
app.use(express.static(path.join(__dirname, "public")))

/* ===============================
   2️⃣ BODY PARSING
   =============================== */
app.use(express.urlencoded({ extended: true }))

/* ===============================
   3️⃣ ROUTES
   =============================== */
app.use("/", require("./routes/indexRoute"))
app.use("/inventory", require("./routes/inventoryRoute"))

/* ===============================
   4️⃣ 404 HANDLER (OPTIONAL)
   =============================== */
app.use((req, res, next) => {
  const err = new Error("Page Not Found")
  err.status = 404
  next(err)
})

/* ===============================
   5️⃣ ERROR HANDLER (LAST LINE)
   =============================== */
const errorHandler = require("./middleware/errorHandler")
app.use(errorHandler)

module.exports = app
