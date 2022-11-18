const { databases, tables } = require("../constants/dbTableConstants");
const { validateCreateProduct } = require("../validations/validateProduct");
const { validateCreateCatalog } = require("../validations/validateCatalog");
const {
    getOrdersData,
    createCatalogData,
    createProductData
} = require("../services/sellerService");

const getOrders = async (req, res) => {
  try {
    //get all orders
    const orders = await getOrdersData(databases.ECOMMERCE, tables.ORDERS, req.userId);

    if (!orders) return res.sendStatus(400); //Bad request

    //Send Orders Data
    res.json({ orders });
  } catch(err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

const createProduct = async (req, res) => {
  try {
    //Validate data
    const validatedData = validateCreateProduct(req.body);

    //insert product
    const product = await createProductData(
        databases.ECOMMERCE,
        tables.PRODUCTS,
        validatedData.value
    );
    if (!product) return res.sendStatus(400); //Bad request

    //Send product added data
    return res.sendStatus(200);
  } catch(err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

const createCatalog = async (req, res) => {
  try {
    //Validate data
    const validatedData = validateCreateCatalog(req.body);

    //insert catalog
    const catalog = await createCatalogData(
        databases.ECOMMERCE,
        tables.CATALOGS,
        validatedData.value,
        req.userId
    );
    if (!catalog) return res.sendStatus(400); //Bad request

    //Send catalog added data
    return res.sendStatus(200);
  } catch(err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = { getOrders, createProduct, createCatalog };
