const express = require('express');
const respondentsController = require('./respondents.controller');
const validate = require('../../../../middleware/validation.middleware');
const respondentsValidation = require('./respondents.validation');
const queryParser = require('../../../../middleware/query-parser.middleware');
const querySearch = require('../../../../middleware/query-search.middleware');

/**
 * @swagger
 * tags:
 *   name: Respondents
 *   description: Respondents
 */
const router = express.Router();

router.post(
  '/submit',
  validate(respondentsValidation.submitRespondentSchema),
  respondentsController.submitRespondent
);

router.get(
  '/',
  queryParser,
  querySearch('first_name', 'last_name', 'department', 'years_of_service'),
  respondentsController.list
);
router.get('/:id', respondentsController.detail);
router.delete('/:id', respondentsController.destroy);

module.exports = router;
