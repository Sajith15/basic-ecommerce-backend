const mysql = require("mysql2/promise");
require("dotenv").config();

const connectDB = async(database) => {
  const pool = await mysql.createPool({
      connectionLimit: 10,
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database
    });

  return pool;
};

module.exports = connectDB;
