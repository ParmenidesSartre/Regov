const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
    email: Joi.string().email().required(),
    biography: Joi.string().required(),
    neighborhood: Joi.string().custom(objectId),
    role: Joi.string().required().valid("Resident", "Authority"),
  }),
};

const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
};
