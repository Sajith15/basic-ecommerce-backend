const joi = require("joi");

const validateCreateProduct = (product) => {
  const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
  });

  return productSchema.validate(product);
};

module.exports = { validateCreateProduct };
