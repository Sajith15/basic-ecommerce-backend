const joi = require("joi");

const validateCreateCatalog = (catalog) => {
  const catalogSchema = joi.object({
    products: joi.array().items(joi.number())
  });

  return catalogSchema.validate(catalog);
};

module.exports = { validateCreateCatalog };
