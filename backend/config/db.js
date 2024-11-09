const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST || "your_mariadb_host", // Use environment variables if available
  user: process.env.DB_USER || "your_mariadb_user",
  password: process.env.DB_PASSWORD || "your_mariadb_password",
  database: process.env.DB_DATABASE || "your_mariadb_database",
  connectionLimit: 5,
});

module.exports = pool; // Export the pool for use in controllers/models
