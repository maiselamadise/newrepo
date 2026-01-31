const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

async function getVehicleDetail(req, res, next) {
  try {
    const vehicleId = parseInt(req.params.id);
    const vehicleData = await invModel.getVehicleById(vehicleId);

    if (!vehicleData) {
      return next({ status: 404, message: "Vehicle not found" });
    }

    const html = utilities.buildVehicleDetailHTML(vehicleData);
    res.send(html);
  } catch (error) {
    next(error);
  }
}

module.exports = { getVehicleDetail };
