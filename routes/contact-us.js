var express = require('express');
var router = express.Router();


const Validator = require('../middleware/validator')
const ValidatorConfig = require('../util/validatorConfig')
const responseUtils = require('../util/responseUtil')
const responseMessages = require('../util/responseMessages');
const contactUsService = require('../services/contact-us-services')
const emailService = require('../services/email-services')


router.post("/", Validator.validatorReqBody(ValidatorConfig.contactUsReqBodyValidatorConfig),async (req, res, next) => {
    try{
        const payload = req.body
        const newContact = await contactUsService.create(payload)
        await emailService.sendContactUsDetailsToPageAdmin(newContact)
        return responseUtils.createResponse(res, responseMessages.contactUs.created)
    }
    catch(error){
        console.log(error)
        return responseUtils.interServerErrorResponse(res)
    }
})


module.exports = router