const joi = require("joi");

const validateUser = (user) => {
  const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(120).required(),
  });

  return userSchema.validate(user);
};

module.exports = { validateUser };
