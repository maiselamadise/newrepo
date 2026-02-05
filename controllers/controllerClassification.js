// Line 1 - Import the database connection from the database folder
// Because the file is named index.js, it does not need to be specified
const pool = require("../database/")


// Lines 3–5 - Multi-line comment introducing the function
/* ****************************************
 * Get all vehicle classifications
 * **************************************** */

// Line 6 - Define an asynchronous function named getClassifications
async function getClassifications() {

  // Line 7 - Return the result of the SQL query using the connection pool
  // `await` waits for the database response, and `return` sends it back
  return await pool.query(
    "SELECT * FROM classification ORDER BY classification_name"
  )
}

// Line 10 - Export the function for use in other files
module.exports = {
  getClassifications
}
