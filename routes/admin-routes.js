var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

const auth = require('../middleware/author');
const Validator  = require('../middleware/validator')

const ValidatorConfig = require('../util/validatorConfig');
const responseMessages = require('../util/responseMessages');
const responseUtils = require('../util/responseUtil')

var { generateJwtToken } = require('../util/generateJwtToken');

var adminService = require('../services/admin-services')

router.post('/', Validator.validatorReqBody(ValidatorConfig.createAdminReqBodyValidatorConfig), auth, async (req, res, next) => {
    try{
        const userId = req.user.id
        const {email} = req.body
        const adminPayload = req.body

        const foundAdmin = await adminService.findAdminByEmail(email)
        if(foundAdmin){
            return responseUtils.conflictErrorResponseMessageToJson(res, responseMessages.common.conflictById('Admin'));
        }
        const newAdmin = await adminService.createAdmin(adminPayload, userId)
        return responseUtils.createResponseWithJson(res, newAdmin);
    }
    catch(error){
        return responseUtils.interServerErrorResponse(res);
    }
})


router.post('/sign-in', Validator.validatorReqBody(ValidatorConfig.signInAdminReqBodyValidatorConfig), async (req, res, next) => {
    try{
        const {email, password} = req.body
        const foundAdmin = await adminService.findAdminByEmail(email)
        if(!foundAdmin){
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Admin'));
        }
        const isMatch = await bcrypt.compare(password, foundAdmin.password);
        if(isMatch){
            const adminToken = generateJwtToken(foundAdmin.email, foundAdmin.password)
            return responseUtils.okResponse(res, adminToken);
        }
        else{
            return responseUtils.validationErrorResponse(res);
        }
    }
    catch(error){
        console.log(error);
        return responseUtils.interServerErrorResponse(res);
    }
})

router.get('/profile', auth, async (req, res, next) => {
    try{
        const email = req.user.email
        const foundAdmin = await adminService.findAdminByEmail(email)
        if(foundAdmin){
            return responseUtils.okResponse(res, foundAdmin);
        }
        return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Admin'));
    } catch(error){
        return responseUtils.interServerErrorResponse(res);
    }
})

module.exports = router;