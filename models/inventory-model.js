const pool = require("../database")

/* ***************************
 * Get all classifications
 * ************************** */
async function getClassifications() {
  try {
    const data = await pool.query(
      "SELECT * FROM public.classification ORDER BY classification_name"
    )
    return data.rows
  } catch (error) {
    console.error("getClassifications error:", error)
    throw error
  }
}

/* ***************************
 * Get inventory by classification
 * ************************** */
async function getInventoryByClassificationId(classificationId) {
  const sql = `
    SELECT *
    FROM inventory
    JOIN classification
      ON inventory.classification_id = classification.classification_id
    WHERE inventory.classification_id = $1
  `
  const data = await pool.query(sql, [classificationId])
  return data.rows
}

/* ***************************
 * Get single vehicle
 * ************************** */
async function getVehicleById(invId) {
  const sql = `
    SELECT *
    FROM inventory
    WHERE inv_id = $1
  `
  const data = await pool.query(sql, [invId])
  return data.rows[0]
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleById
}
