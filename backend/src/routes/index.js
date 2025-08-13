const express = require('express');

// define route dependencies
const coreRoute = require('./core/router');
const miscRoute = require('../application/misc/misc.route');

const router = express.Router();

const routes = [
  {
    path: '/',
    route: coreRoute,
  },
  {
    path: '/misc',
    route: miscRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
