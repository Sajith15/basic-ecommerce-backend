const joi = require("joi");

const validateRegister = (user) => {
  const userSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().min(8).max(120).required(),
    type: joi.string().valid('buyer','seller').required()
  });

  return userSchema.validate(user);
};

const validateLogin = (user) => {
  const userSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().min(8).max(120).required()
  });

  return userSchema.validate(user);
};

module.exports = { validateRegister, validateLogin };
