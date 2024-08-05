const Joi = require('joi')

const createAdminReqBodyValidatorConfig ={
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
}

const signInAdminReqBodyValidatorConfig = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
}

const newsReqBodyValidatorConfig = {
    topic: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    language: Joi.string().required(),
    attachments: Joi.array().items(Joi.string()),
    date: Joi.date().allow(null),
    time: Joi.date().allow(null),
    image: Joi.string().default('').empty(''),
    video_link: Joi.string().default('').empty('')
}

const newsReqQuerySortValidatorConfig = {
    search: Joi.string().default('').empty(''),
    page: Joi.number().default(1).empty(''),
    limit: Joi.number().default(10).empty(''),
    sortOrder: Joi.string().valid('ASC','DESC').default('ASC').empty(''),
    language: Joi.string().default('').empty(''),
    category: Joi.string().default('').empty(''),

}

const newsReqPathValidatorConfig = {
    id: Joi.string().min(24).max(24).required()
}

const newsReqBodyPatchValidatorConfig = {
    isDisable: Joi.boolean().default(false)
}

module.exports ={
    createAdminReqBodyValidatorConfig,
    signInAdminReqBodyValidatorConfig,
    newsReqBodyValidatorConfig, 
    newsReqQuerySortValidatorConfig,
    newsReqPathValidatorConfig,
    newsReqBodyPatchValidatorConfig
}