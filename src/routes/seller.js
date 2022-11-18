const express = require("express");
const app = express();
const router = express.Router();
const sellerController = require("../controllers/sellerController");
const { seller } = require("../middlewares/role");

// MiddleWare for Seller Protected routes
app.use(seller);

router
  .route("/create-product")
  .post(sellerController.createProduct)

router
  .route("/create-catalog")
  .post(sellerController.createCatalog)

router
  .route("/orders")
  .get(sellerController.getOrders)

module.exports = router;
