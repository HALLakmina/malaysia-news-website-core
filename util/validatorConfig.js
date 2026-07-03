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
    sub_category: Joi.string().required(),
    language: Joi.string().required(),
    attachments: Joi.array().items(Joi.string()),
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

const contactUsReqBodyValidatorConfig ={
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    message: Joi.string(),
}

const categoryReqBodyValidatorConfig = {
    lable: Joi.string().required(),
    value: Joi.string().required()
}

const categoryReqPathValidatorConfig = {
    category: Joi.string().required()
}

const subCategoryReqBodyValidatorConfig = {
    lable: Joi.string().required(),
    value: Joi.string().required()
}

const subCategoryReqPathValidatorConfig = {
    category: Joi.string().required(),
    subCategory: Joi.string().required()
}

module.exports ={
    createAdminReqBodyValidatorConfig,
    signInAdminReqBodyValidatorConfig,
    newsReqBodyValidatorConfig,
    newsReqQuerySortValidatorConfig,
    newsReqPathValidatorConfig,
    newsReqBodyPatchValidatorConfig,
    contactUsReqBodyValidatorConfig,
    categoryReqBodyValidatorConfig,
    categoryReqPathValidatorConfig,
    subCategoryReqBodyValidatorConfig,
    subCategoryReqPathValidatorConfig
}