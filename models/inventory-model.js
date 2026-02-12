const pool = require("../database/")

/* ***************************
 * Get all classifications
 * ************************** */
async function getClassifications () {
  try {
    const sql = `
      SELECT classification_id, classification_name
      FROM public.classification
      ORDER BY classification_name
    `
    const data = await pool.query(sql)
    return data
  } catch (error) {
    console.error("getClassifications error:", error)
    throw error
  }
}

/* ***************************
 * Get inventory by classification_id
 * ************************** */
async function getInventoryByClassificationId (classification_id) {
  try {
    const sql = `
      SELECT i.*, c.classification_name
      FROM public.inventory i
      JOIN public.classification c
        ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1
      ORDER BY i.inv_make
    `
    const data = await pool.query(sql, [classification_id])
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error:", error)
    throw error
  }
}

/* ***************************
 * Get vehicle by inv_id
 * ************************** */
async function getVehicleById (inv_id) {
  try {
    const sql = `
      SELECT i.*, c.classification_name
      FROM public.inventory i
      JOIN public.classification c
        ON i.classification_id = c.classification_id
      WHERE i.inv_id = $1
    `
    const data = await pool.query(sql, [inv_id])
    return data.rows[0]
  } catch (error) {
    console.error("getVehicleById error:", error)
    throw error
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleById,
}

