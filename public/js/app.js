const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
const inventoryRoutes = require("./routes/inventoryRoutes");
const errorRoutes = require("./routes/errorRoutes");

app.use("/inventory", inventoryRoutes);
app.use("/error", errorRoutes);

// Error handling middleware
const handleErrors = require("./middleware/errorHandler");
app.use(handleErrors);

module.exports = app;
