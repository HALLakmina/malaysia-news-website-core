const jwt = require('jsonwebtoken');
require('dotenv').config()

const responseUtils = require('../util/responseUtil')

const JWT_SECRET  = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    const access_token = req.headers["access-token"];

    if(!access_token){
        return responseUtils.validationErrorResponse(res,`Token is required.`);
    }
    try{
        const decodedToken = await jwt.verify(access_token, JWT_SECRET)
        req.user = decodedToken;
    }catch(err){
        return responseUtils.validationErrorResponse(res, err)
    }
    return next();
}
module.exports = verifyToken;