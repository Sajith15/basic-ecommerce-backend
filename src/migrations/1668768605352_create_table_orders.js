const { tables } = require("../constants/dbTableConstants");

module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS ${tables.ORDERS} (id BIGINT PRIMARY KEY AUTO_INCREMENT, order_id BIGINT, seller_id BIGINT, buyer_id BIGINT, product_id BIGINT, createdAt DATETIME, updatedAt DATETIME, deletedAt DATETIME, FOREIGN KEY (buyer_id) REFERENCES ${tables.USERS}(id), FOREIGN KEY (product_id) REFERENCES ${tables.PRODUCTS}(id), FOREIGN KEY (seller_id) REFERENCES ${tables.USERS}(id))`,
    "down": `DROP TABLE IF EXISTS ${tables.ORDERS}`
}