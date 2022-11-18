const express = require("express");
const app = express();
const router = express.Router();
const buyerController = require("../controllers/buyerController");
const { buyer } = require("../middlewares/role");

// MiddleWare for Buyer Protected routes
app.use(buyer);

router
  .route("/list-of-sellers")
  .get(buyerController.getSellers)

router
  .route("/seller-catalog/:seller_id")
  .get(buyerController.getSellerCatalog)

router
  .route("/create-order/:seller_id")
  .post(buyerController.createOrder)

module.exports = router;
