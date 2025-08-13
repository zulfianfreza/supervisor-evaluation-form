const httpStatus = require('http-status');

/**
 * api response success
 * @param {*} res
 * @param {string} message
 * @param {object} data
 * @param {number} status
 */
const apiResponse = (res, message, data, status = httpStatus.OK) => {
  const response = {
    success: true,
    message,
    data,
  };
  res.status(status).send(response);
};

module.exports = apiResponse;
