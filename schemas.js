const Joi = require('joi')

module.exports.teamValidateSchema = Joi.object({
    team: Joi.object({
        title: Joi.string().required(),
        country: Joi.string().required(),
        crest: Joi.string().required(),
        year: Joi.number().min(0).required(),
        championsLeague: Joi.number().min(0).required(),
    }).required()
})