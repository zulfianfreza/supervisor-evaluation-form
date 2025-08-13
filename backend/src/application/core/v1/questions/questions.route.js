const express = require('express');
const questionsController = require('./questions.controller');
const validate = require('../../../../middleware/validation.middleware');
const questionsValidation = require('./questions.validation');
const queryParser = require('../../../../middleware/query-parser.middleware');
const querySearch = require('../../../../middleware/query-search.middleware');
// const { auth } = require('../../../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Questions
 */
const router = express.Router();

/**
 * @swagger
 * /api/core/v1/questions:
 *   post:
 *     summary: Create Questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: [auth]
 *     description: Returns questions data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createOrUpdateQuestionsRequest'
 *     responses:
 *       '201':
 *         description: Successful Response
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/questionsCreatedResponse'
 *       '401':
 *         description: Unauthorize response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/unauthorizedResponse'
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/forbiddenResponse'
 *       '404':
 *         description: Not Found response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/notFoundResponse'
 *       '422':
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/badRequestFormResponse'
 */
router.post('/', validate(questionsValidation.createOrUpdate), questionsController.create);

/**
 * @swagger
 * /api/core/v1/questions:
 *   get:
 *     summary: List Questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: [auth]
 *     description: Returns questions data
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - $ref: '#/components/parameters/search'
 *       - $ref: '#/components/parameters/sortBy'
 *     responses:
 *       '200':
 *         description: Successful Response
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/questionssResponse'
 *       '401':
 *         description: Unauthorize response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/unauthorizedResponse'
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/forbiddenResponse'
 *       '404':
 *         description: Not Found response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/notFoundResponse'
 *       '422':
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/badRequestFormResponse'
 */
router.get('/', queryParser, querySearch('question_test'), questionsController.list);

/**
 * @swagger
 * /api/core/v1/questions/{id}:
 *   get:
 *     summary: Get Questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: [auth]
 *     description: Returns questions data
 *     parameters:
 *       - $ref: '#/components/parameters/paramsIdString'
 *     responses:
 *       '200':
 *         description: Successful Response
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/questionsResponse'
 *       '401':
 *         description: Unauthorize response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/unauthorizedResponse'
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/forbiddenResponse'
 *       '404':
 *         description: Not Found response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/notFoundResponse'
 *       '422':
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/badRequestFormResponse'
 */
router.get('/:id', questionsController.detail);

/**
 * @swagger
 * /api/core/v1/questions/{id}:
 *   put:
 *     summary: Update Questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: [auth]
 *     description: Returns questions data
 *     parameters:
 *       - $ref: '#/components/parameters/paramsIdString'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createOrUpdateQuestionsRequest'
 *     responses:
 *       '200':
 *         description: Successful Response
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/questionsUpdateResponse'
 *       '401':
 *         description: Unauthorize response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/unauthorizedResponse'
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/forbiddenResponse'
 *       '404':
 *         description: Not Found response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/notFoundResponse'
 *       '422':
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/badRequestFormResponse'
 */
router.put('/:id', validate(questionsValidation.createOrUpdate), questionsController.update);

/**
 * @swagger
 * /api/core/v1/questions/{id}:
 *   delete:
 *     summary: Delete Questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: [auth]
 *     description: Returns questions data
 *     parameters:
 *       - $ref: '#/components/parameters/paramsIdString'
 *     responses:
 *       '200':
 *         description: Successful Response
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/questionsDeleteResponse'
 *       '401':
 *         description: Unauthorize response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/unauthorizedResponse'
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/forbiddenResponse'
 *       '404':
 *         description: Not Found response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/notFoundResponse'
 *       '422':
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/badRequestFormResponse'
 */
router.delete('/:id', questionsController.destroy);

module.exports = router;
