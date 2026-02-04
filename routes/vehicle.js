// routes/vehicles.js
const express = require("express");
const router = express.Router();

router.get("/custom", (req, res) => res.render("custom"));
router.get("/sedan", (req, res) => res.render("sedan"));
router.get("/suv", (req, res) => res.render("suv"));
router.get("/truck", (req, res) => res.render("truck"));

module.exports = router;
