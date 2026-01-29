const {pool}  = require("pg");
require("dotenv").config();
/********* Database Connection *********/
let pool;
if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

// For troubleshooting locally
//guring development
module.exports = {
    async query(text, params) {
        try {
            const res = await pool.query(text, params);
            return res;
        } catch (err) {
            console.error('Database query error:', err);
            throw err;
        }
    },
};