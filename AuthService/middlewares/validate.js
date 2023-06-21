const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.body.validate(req.body);

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  next();
};

module.exports = validate;
