// controllers/inventoryController.js
const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

async function buildByInvId(req, res, next) {
  const invId = req.params.invId;
  const vehicleData = await invModel.getVehicleById(invId);

  if (!vehicleData) {
    return res.status(404).render("inventory/detail", {
      title: "Vehicle Not Found",
      message: "Sorry, we couldn't find that vehicle."
    });
  }

  const vehicleHTML = utilities.buildVehicleDetailHTML(vehicleData);

  res.render("inventory/detail", {
    title: `${vehicleData.make} ${vehicleData.model}`,
    vehicleHTML
  });
}

module.exports = { buildByInvId };
