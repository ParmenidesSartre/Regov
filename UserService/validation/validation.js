const Joi = require('joi');
const { objectId } = require("./custom.validation");

const getUser = {
  params: Joi.object().keys({
    userID: Joi.string().custom(objectId),
  }),
  query: Joi.object().keys({
    fields: Joi.string().pattern(new RegExp('^([a-zA-Z0-9]+,)*[a-zA-Z0-9]+$')),
  }),
};

const getUserFamily = {
  params: Joi.object().keys({
    userID: Joi.string().custom(objectId),
  }),
  query: Joi.object().keys({
    fields: Joi.string().pattern(new RegExp('^([a-zA-Z0-9]+,)*[a-zA-Z0-9]+$')),
  }),
};

const getNeighborhood = {
  params: Joi.object().keys({
    neighborhoodID: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getUser,
  getUserFamily,
  getNeighborhood,
};
