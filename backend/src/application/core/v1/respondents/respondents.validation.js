const Joi = require('joi');

const submitRespondentSchema = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    department: Joi.string().required(),
    years_of_service: Joi.string().required(),
    answers: Joi.array()
      .items(
        Joi.object().keys({
          question_id: Joi.string().required(),
          answer: Joi.number().required(),
        })
      )
      .required(),
  }),
};

module.exports = {
  submitRespondentSchema,
};
