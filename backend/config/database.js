const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: 1434,
  options: {
    trustServerCertificate: true,
    encrypt: false
  }
};

sql.connect(config).then(() => {
  console.log("SQL Server Connected");
}).catch((err) => {
  console.error("Database connection failed", err);
});

module.exports = sql;
