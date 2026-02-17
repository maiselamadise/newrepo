const pool = require("../database/")

async function getAccountById(account_id) {
  const sql = `
    SELECT account_id, account_firstname, account_lastname, account_email, account_type
    FROM account
    WHERE account_id = $1
  `
  const result = await pool.query(sql, [account_id])
  return result.rows[0]
}

async function updateAccount(account_id, firstname, lastname, email) {
  const sql = `
    UPDATE account
    SET account_firstname = $1,
        account_lastname = $2,
        account_email = $3
    WHERE account_id = $4
  `
  return pool.query(sql, [firstname, lastname, email, account_id])
}

async function updatePassword(account_id, password) {
  const sql = `
    UPDATE account
    SET account_password = $1
    WHERE account_id = $2
  `
  return pool.query(sql, [password, account_id])
}

module.exports = {
  getAccountById,
  updateAccount,
  updatePassword,
}
