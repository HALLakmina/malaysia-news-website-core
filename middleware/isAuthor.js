const jwt = require('jsonwebtoken');
require('dotenv').config()

const responseUtils = require('../util/responseUtil')

const JWT_SECRET  = process.env.JWT_SECRET;

const isAuthor = async (req, res, next) => {
    const admin_access_token = req.headers["admin-access-token"];

    if(admin_access_token){
        try{
            const decodedToken = await jwt.verify(admin_access_token, JWT_SECRET)
            req.user = decodedToken;
        }catch(err){
            return responseUtils.validationErrorResponse(res, err)
        }
    }
    return next();
}
module.exports = isAuthor;