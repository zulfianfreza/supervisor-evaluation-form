const BaseService = require('../../../../@core/service/BaseService');
const { assessment_responses } = require('../../../../database/models');

class AssessmentResponsesService extends BaseService {}

module.exports = new AssessmentResponsesService(assessment_responses);
