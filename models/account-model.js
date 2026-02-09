const pool = require("../database")

async function getAccountById(account_id) {
  const result = await pool.query(
    "SELECT * FROM account WHERE account_id = $1",
    [account_id]
  )
  return result.rows[0]
}

async function updateAccount(firstname, lastname, email, account_id) {
  const result = await pool.query(
    `UPDATE account
     SET account_firstname=$1, account_lastname=$2, account_email=$3
     WHERE account_id=$4`,
    [firstname, lastname, email, account_id]
  )
  return result.rowCount
}

async function updatePassword(password, account_id) {
  const result = await pool.query(
    "UPDATE account SET account_password=$1 WHERE account_id=$2",
    [password, account_id]
  )
  return result.rowCount
}

module.exports = {
  getAccountById,
  updateAccount,
  updatePassword,
}
