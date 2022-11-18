const connectDB = require("../config/dbConn")

const getUser = async (database, table, column, data) => {
  //Connect to pool
  const pool = await connectDB(database);

  //Get user by their data
  const [rows] = await pool.query(`SELECT * FROM ${table} WHERE ${column} = ?`, [data]);

  return rows[0];
};

module.exports = getUser;
