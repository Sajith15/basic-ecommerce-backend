const { tables } = require("../constants/dbTableConstants");

module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS ${tables.USERS} (id BIGINT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(100), password VARCHAR(255), type VARCHAR(10), createdAt DATETIME, updatedAt DATETIME, deletedAt DATETIME)`,
    "down": `DROP TABLE IF EXISTS ${tables.USERS}`
}