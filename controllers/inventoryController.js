const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

async function buildDetailView(req, res, next) {
  try {
    const invId = parseInt(req.params.invId);
    const vehicleData = await invModel.getVehicleById(invId);

    if (!vehicleData) {
      return next({ status: 404, message: "Vehicle not found" });
    }

    const htmlContent = utilities.buildVehicleDetailHTML(vehicleData);

    res.render("inventory/detail", {
      title: `${vehicleData.make} ${vehicleData.model}`,
      content: htmlContent
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { buildDetailView };
