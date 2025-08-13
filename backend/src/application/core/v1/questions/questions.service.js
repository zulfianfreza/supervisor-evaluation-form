const BaseService = require('../../../../@core/service/BaseService');
const { questions } = require('../../../../database/models');

class QuestionsService extends BaseService {}

module.exports = new QuestionsService(questions);
