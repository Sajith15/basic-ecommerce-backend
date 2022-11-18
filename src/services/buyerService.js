const connectDB = require("../config/dbConn");
const { tables } = require("../constants/dbTableConstants");

const getSellerCatalogData = async (database, table, id) => {
    //Connect to pool
    const pool = await connectDB(database);

    //Get seller catalog
    const [productIdRows] = await pool.query(`SELECT product_id FROM ${table} WHERE seller_id = ? AND deletedAt IS NULL`, [id]);
    
    let productIds = [];

    for(i=0;i<productIdRows.length;i++) {
        productIds.push(productIdRows[i].product_id);
    }

    const [productRows] = await pool.query(`SELECT name AS PRODUCT_NAME, price as PRODUCT_PRICE FROM ${tables.PRODUCTS} WHERE id IN (?) AND deletedAt IS NULL`, [productIds]);

    return productRows;
};

const getSellersData = async (database, table) => {
    //Connect to pool
    const pool = await connectDB(database);

    //Get sellers
    const [rows] = await pool.query(`SELECT username AS SELLER_NAME FROM ${table} WHERE type = 'seller' AND deletedAt IS NULL`);

    return rows;
};

const createOrderData = async (database, table, data, seller_id, buyer_id) => {
    const { products } = data;

    //Connect to pool
    const pool = await connectDB(database);

    //Generate new Order ID
    const [count] = await pool.query(`SELECT COUNT(DISTINCT(order_id)) AS count_order FROM ${table}`);
    let curr_order_id = count[0].count_order+1;

    //Insert into DB
    for(let i=0; i<products.length; i++) {
        await pool.query(
            `INSERT INTO ${table} (order_id, seller_id, buyer_id, product_id, createdAt) VALUES (?, ?, ?, ?, NOW())`,
            [curr_order_id, seller_id, buyer_id, products[i]]
        );
    };

    return 'success';
};

module.exports = { getSellerCatalogData, getSellersData, createOrderData };
