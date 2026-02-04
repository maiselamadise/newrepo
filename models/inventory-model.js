const pool = require("../database/")

/* ***************************
 * Get all classifications
 * ************************** */
async function getClassifications() {
  try {
    const data = await pool.query(
      "SELECT * FROM classification ORDER BY classification_name"
    )
    return data.rows
  } catch (error) {
    console.error("getClassifications error " + error)
  }
}

/* ***************************
 * Get inventory by classification
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM inventory
       JOIN classification
       ON inventory.classification_id = classification.classification_id
       WHERE inventory.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error " + error)
  }
}

/* ***************************
 * Get vehicle by inventory ID
 * ************************** */
async function getVehicleById(inv_id) {
  try {
    const data = await pool.query(
      "SELECT * FROM inventory WHERE inv_id = $1",
      [inv_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getVehicleById error " + error)
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleById,
}
