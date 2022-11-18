const { databases, tables } = require("../constants/dbTableConstants");
const { validateCreateOrder } = require("../validations/validateOrder");
const {
    getSellersData,
    getSellerCatalogData,
    createOrderData
} = require("../services/buyerService");

const getSellers = async (req, res) => {
  try {
    //get all sellers
    const sellers = await getSellersData(databases.ECOMMERCE, tables.USERS);

    if (!sellers) return res.sendStatus(400); //Bad request

    //Send Sellers Data
    res.json({ sellers });
  } catch(err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

const getSellerCatalog = async (req, res) => {
  try {
    //get sellerCatalog
    const sellerCatalog = await getSellerCatalogData(databases.ECOMMERCE, tables.CATALOGS, req.params.seller_id);

    if (!sellerCatalog) return res.sendStatus(400); //Bad request

    //Send SellerCatalog Data
    res.json({ sellerCatalog });
  } catch(err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

const createOrder = async (req, res) => {
  try {
    //Validate data
    const validatedData = validateCreateOrder(req.body);

    //insert order
    const order = await createOrderData(
        databases.ECOMMERCE,
        tables.ORDERS,
        validatedData.value,
        req.params.seller_id,
        req.userId
    );
    if (!order) return res.sendStatus(400); //Bad request

    //Send order added data
    res.json({ order });
  } catch(err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = { getSellers, getSellerCatalog, createOrder };
