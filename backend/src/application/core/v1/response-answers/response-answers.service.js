const BaseService = require('../../../../@core/service/BaseService');
const { response_answers } = require('../../../../database/models');

class AssessmentResponsesService extends BaseService {}

module.exports = new AssessmentResponsesService(response_answers);
