const Joi = require('joi');

const createOrUpdate = {
  body: Joi.object().keys({
    question_text: Joi.string().required(),
  }),
};

module.exports = {
  createOrUpdate,
};
