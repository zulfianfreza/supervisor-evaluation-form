const httpStatus = require('http-status');
const BaseService = require('../../../../@core/service/BaseService');
const ApiError = require('../../../../common/helpers/ApiError');
const { respondents, sequelize } = require('../../../../database/models');
const assessmentResponsesService = require('../assessment-responses/assessment-responses.service');
const responseAnswersService = require('../response-answers/response-answers.service');

class RespondentsService extends BaseService {
  constructor(model) {
    super(model);
    this.sequelize = sequelize;
  }

  async submitRespondent(data) {
    const t = await this.sequelize.transaction();

    try {
      const newRespondent = await super.create(data, {
        transaction: t,
      });

      const newAssessmentResponse = await assessmentResponsesService.create(
        {
          respondent_id: newRespondent.id,
          submitted_at: new Date(),
        },
        {
          transaction: t,
        }
      );

      const newResponseAnswersPayload = data.answers.map((answer) => ({
        question_id: answer.question_id,
        answer: parseInt(answer.answer, 10),
        assessment_response_id: newAssessmentResponse.id,
      }));

      await Promise.all(
        newResponseAnswersPayload.map((payload) =>
          responseAnswersService.create(payload, { transaction: t })
        )
      );

      await t.commit();

      const findRespondent = await super.findOne({
        where: {
          id: newRespondent.id,
        },
        include: [
          {
            association: 'assessment_response',
            include: [
              {
                association: 'response_answers',
              },
            ],
          },
        ],
      });

      return findRespondent;
    } catch (error) {
      await t.rollback();
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }
}

module.exports = new RespondentsService(respondents);
