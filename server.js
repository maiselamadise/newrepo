require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const inventoryRoute = require("./routes/inventoryRoute");
const errorRoute = require("./routes/errorRoute");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", inventoryRoute);
app.use("/", errorRoute);

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    title: "Error",
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
