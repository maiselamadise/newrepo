// routes/inventoryRoute.js
const express = require("express");
const router = express.Router();

const invController = require("../controllers/inventoryController");
const utilities = require("../utilities");

router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildInventoryDetail)
);

module.exports = router;
