const pool = require("../database/")

async function getClassificationId () {return await pool.query(`SELECT classification_id, classification_name FROM public.classification ORDER BY classification_name`);}

/* ****************************************
 * Get vehicle by inventory ID
 * *************************************** */
async function getInventoryById(invId) {
  const sql = `
    SELECT * FROM inventory
    WHERE inv_id = $1
  `
  const data = await pool.query(sql, [invId])
  return data.rows[0]
}

module.exports = {
  getInventoryById,
}
