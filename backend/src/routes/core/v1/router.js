const express = require('express');

// define route dependencies
const questionsRoute = require('../../../application/core/v1/questions/questions.route');
const respondentsRoute = require('../../../application/core/v1/respondents/respondents.route');

const router = express.Router();

const routes = [
  {
    path: '/questions',
    route: questionsRoute,
  },
  {
    path: '/respondents',
    route: respondentsRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
