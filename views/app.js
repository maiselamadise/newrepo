const express = require("express")
const path = require("path")

const app = express()

/* 🔽 PUT THIS HERE 🔽 */
app.use(express.static(path.join(__dirname, "public")))

/* middleware */
app.use(express.urlencoded({ extended: true }))

/* routes */
app.use("/", require("./routes/indexRoute"))
app.use("/inventory", require("./routes/inventoryRoute"))
