const Joi = require('joi')
const responseUtils = require('../util/responseUtil')

const validatorReqBody =  (obj) => {
    const validateObj = Joi.object({...obj});
    return async (req, res, next) => {
        const payload = req.body;
        try{
            await validateObj.validateAsync(payload, { abortEarly: false })            
            next()
        }catch( err){
            if(err.isJoi){
                return responseUtils.validationErrorResponse(res, err.details)
            }
            return responseUtils.interServerErrorResponse(res)
        }        
    }  
}

const validatorReqPath = (obj) => {    
    const validateObj = Joi.object({...obj});
    return async (req, res, next) => {
        const params = req.params;
        try{
            await validateObj.validateAsync(params, { abortEarly: false })
            next();
        } catch(err) {
            if(err.isJoi) {
                return responseUtils.validationErrorResponse(res, err.details)
            }
            return responseUtils.interServerErrorResponse(res)
        }
    }
}

const validatorReqQuery = (obj) => {
    const validateObj = Joi.object({...obj});
    return async (req, res, next) => {
        const query = req.query;
        try{
            await validateObj.validateAsync(query, { abortEarly: false })
            next();
        } catch(err) {
            if(err.isJoi) {
                return responseUtils.validationErrorResponse(res, err.details)
            }
            return responseUtils.interServerErrorResponse(res)
        }
    }
}

 const validator = (data, obj) => {
    const validateObj = Joi.object({...obj});
    return validateObj.validate(data)            
} 

module.exports = { validator, validatorReqBody, validatorReqPath, validatorReqQuery } 