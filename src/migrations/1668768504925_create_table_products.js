const { tables } = require("../constants/dbTableConstants");

module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS ${tables.PRODUCTS} (id BIGINT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), price DECIMAL(20,2), createdAt DATETIME, updatedAt DATETIME, deletedAt DATETIME)`,
    "down": `DROP TABLE IF EXISTS ${tables.PRODUCTS}`
}