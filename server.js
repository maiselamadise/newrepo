const express = require("express");
const app = express();
const inventoryRoutes = require("./routes/inventoryRoute");
const errorRoutes = require("./routes/errorRoute");
const errorHandler = require("./middleware/errorHandler");

app.use(express.static("public"));
app.use("/inventory", inventoryRoutes);
app.use("/", errorRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
