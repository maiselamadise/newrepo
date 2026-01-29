// models/inventory-model.js
const pool = require("../database/"); // assuming pg or mysql connection

async function getVehicleById(invId) {
  try {
    const result = await pool.query(
      "SELECT * FROM inventory WHERE inv_id = $1",
      [invId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return null;
  }
}

module.exports = { getVehicleById };
