// inventoryRoute.js
const express = require("express");
const router = new express.Router();

// Import your controller
const invController = require("../controllers/invController");

// Import utilities (make sure /src/utilities/index.js exports handleErrors)
const utilities = require("../utilities");

// Inventory routes
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildInventoryDetail)
);

router.get(
  "/",
  utilities.handleErrors(invController.buildInventory)
);

// Add other routes as needed
router.post(
  "/add",
  utilities.handleErrors(invController.addInventoryItem)
);

module.exports = router;
