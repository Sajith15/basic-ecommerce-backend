const mysql = require('mysql2');
const migration = require('mysql-migrations');
const { databases } = require("../constants/dbTableConstants");

const connection = mysql.createPool({
  connectionLimit : 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database : databases.ECOMMERCE
});

migration.init(connection, __dirname + '/', function() {
  console.log("Migrations Completed!");
});