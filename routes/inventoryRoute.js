const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

router.get("/detail/:invId", invController.buildDetailView);

module.exports = router;
