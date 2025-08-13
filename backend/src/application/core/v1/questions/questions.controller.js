const httpStatus = require('http-status');
const catchAsync = require('../../../../common/helpers/catchAsync');
const apiResponse = require('../../../../common/helpers/apiResponse');
const CONST = require('../../../../common/constants');
const questionsService = require('./questions.service');
const ApiError = require('../../../../common/helpers/ApiError');

const { messages } = CONST;

const create = catchAsync(async (req, res) => {
  const { body } = req;
  const result = await questionsService.create(body);
  apiResponse(res, messages.COMMON.CREATED, result, httpStatus.CREATED);
});

const list = catchAsync(async (req, res) => {
  const { query } = req;
  console.log(query);
  const result = await questionsService.findAll(query);
  apiResponse(res, messages.COMMON.OK, result);
});

const detail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await questionsService.findById(id);
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, messages.COMMON.NOT_FOUND);
  apiResponse(res, messages.COMMON.OK, result);
});

const update = catchAsync(async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const result = await questionsService.findById(id);
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, messages.COMMON.NOT_FOUND);
  result.update(body);
  apiResponse(res, messages.COMMON.UPDATED, result);
});

const destroy = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await questionsService.findById(id);
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, messages.COMMON.NOT_FOUND);
  result.destroy();
  apiResponse(res, messages.COMMON.DELETED, result);
});

module.exports = {
  create,
  list,
  detail,
  update,
  destroy,
};
