const connectDB = require("../config/dbConn");
const { tables } = require("../constants/dbTableConstants");

const getOrdersData = async (database, table, seller_id) => {
    //Connect to pool
    const pool = await connectDB(database);

    //Get all orders
    const [rows] = await pool.query(`SELECT ${table}.order_id, ${table}.buyer_id, ${table}.product_id, ${tables.PRODUCTS}.name, ${tables.PRODUCTS}.price 
        FROM ${table} INNER JOIN ${tables.PRODUCTS} ON ${table}.product_id = ${tables.PRODUCTS}.id WHERE ${table}.seller_id = ? AND ${table}.deletedAt IS NULL`, [seller_id]);

    return rows;
};

const createProductData = async (database, table, data) => {
    const { name, price } = data;

    //Connect to pool
    const pool = await connectDB(database);

    //Insert into DB
    const [result] = await pool.query(
        `INSERT INTO ${table} (name, price, createdAt) VALUES (?, ?, NOW())`, [name, price]
    );

    return result;
};

const createCatalogData = async (database, table, data, seller_id) => {
    const { products } = data;

    //Connect to pool
    const pool = await connectDB(database);

    await pool.query(
        `DELETE FROM ${table} WHERE seller_id = ?`, [seller_id]
    );

    //Insert into DB
    for(let i=0; i<products.length; i++) {
        pool.query(
            `INSERT INTO ${table} (seller_id, product_id, createdAt) VALUES (?, ?, NOW())`,
            [seller_id, products[i]]
        );
    };

    return 'success';
};

module.exports = { getOrdersData, createProductData, createCatalogData };
