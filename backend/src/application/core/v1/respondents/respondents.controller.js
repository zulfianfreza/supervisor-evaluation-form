const httpStatus = require('http-status');
const catchAsync = require('../../../../common/helpers/catchAsync');
const apiResponse = require('../../../../common/helpers/apiResponse');
const CONST = require('../../../../common/constants');
const respondentsService = require('./respondents.service');
const ApiError = require('../../../../common/helpers/ApiError');

const { messages } = CONST;

const submitRespondent = catchAsync(async (req, res) => {
  const { body } = req;
  const result = await respondentsService.submitRespondent(body);
  apiResponse(res, messages.COMMON.CREATED, result, httpStatus.CREATED);
});

const list = catchAsync(async (req, res) => {
  const { query } = req;
  console.log(query);
  const result = await respondentsService.findAll({
    ...query,
    include: [
      {
        association: 'assessment_response',
      },
    ],
  });
  apiResponse(res, messages.COMMON.OK, result);
});

const detail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await respondentsService.findOne({
    where: { id },
    include: [
      {
        association: 'assessment_response',
        include: [
          {
            association: 'response_answers',
            include: [
              {
                association: 'question',
              },
            ],
          },
        ],
      },
    ],
  });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, messages.COMMON.NOT_FOUND);
  apiResponse(res, messages.COMMON.OK, result);
});

const destroy = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await respondentsService.findById(id);
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, messages.COMMON.NOT_FOUND);
  result.destroy();
  apiResponse(res, messages.COMMON.DELETED, result);
});

module.exports = { submitRespondent, list, detail, destroy };
