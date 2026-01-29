const { Pool } = require("pg")
require("dotenv").config()

/********* Database Connection *********/
let pool

if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })
} else {
  // local development
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  })
}

module.exports = {
  query: (text, params) => pool.query(text, params),
}
