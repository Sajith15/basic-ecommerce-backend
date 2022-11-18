const joi = require("joi");

const validateCreateOrder = (order) => {
  const orderSchema = joi.object({
    products: joi.array().items(joi.number())
  });

  return orderSchema.validate(order);
};

module.exports = { validateCreateOrder };
