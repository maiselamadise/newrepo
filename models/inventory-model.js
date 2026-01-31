const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  try {
    const data = await pool.query(
      "SELECT * FROM public.classification ORDER BY classification_name"
    )
    return data.rows
  } catch (error) {
    console.error("getClassifications error", error)
    throw error
  }
}

/* ***************************
 *  Get inventory by classification id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const sql = `
      SELECT * 
      FROM inventory 
      WHERE classification_id = $1
      ORDER BY inv_make
    `
    return await pool.query(sql, [classification_id])
  } catch (error) {
    return error.message
  }
}

/* ***************************
 *  Get specific vehicle by inventory id
 * ************************** */
async function getInventoryById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1"
    return await pool.query(sql, [inv_id])
  } catch (error) {
    return error.message
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById,
}
