const httpStatus = require('http-status');
const ApiError = require('../common/helpers/ApiError');
const qp = require('../common/helpers/queryParser');

const queryParser = (req, res, next) => {
  try {
    // req.allStatus = req.query.allStatus;
    // req.onlyFinish = req.query.onlyFinish;
    // req.companyId = req.query.companyId;
    // req.filter = req.query.filter;
    // req.keyword = req.query.keyword;

    const { page = 1, limit = 10 } = req.query;
    req.query = qp(req.query);
    req.query.offset = (page - 1) * limit;
    req.query.limit = Number(limit) || 10;
    next();
  } catch (error) {
    next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid Query'));
  }
};

module.exports = queryParser;
