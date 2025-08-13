const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../common/helpers/pick');
const ApiError = require('../common/helpers/ApiError');

const validate = (schema) => async (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    return next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Validation Error', error.details));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
