const responseMessages = require('../util/responseMessages')
const responseUtils = require('../util/responseUtil')

const adminService = require('../services/admin-services')

const create = async (req, res, next) => {
    try {
        const userId = req.user.id
        const { email } = req.body
        const adminPayload = req.body

        const foundAdmin = await adminService.findAdminByEmail(email)
        if (foundAdmin) {
            return responseUtils.conflictErrorResponseMessageToJson(res, responseMessages.common.conflictById('Admin'));
        }
        const newAdmin = await adminService.createAdmin(adminPayload, userId)
        return responseUtils.createResponseWithJson(res, newAdmin);
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res);
    }
}

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const foundAdmin = await adminService.findAdminByEmail(email)
        if (!foundAdmin) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Admin'));
        }
        const isMatch = await adminService.comparePassword(password, foundAdmin.password);
        if (isMatch) {
            const adminToken = adminService.generateToken(foundAdmin.email, foundAdmin.password)
            return responseUtils.okResponse(res, adminToken);
        }
        else {
            return responseUtils.validationErrorResponse(res);
        }
    }
    catch (error) {
        console.log(error);
        return responseUtils.interServerErrorResponse(res);
    }
}

const getProfile = async (req, res, next) => {
    try {
        const email = req.user.email
        const foundAdmin = await adminService.findAdminByEmail(email)
        if (foundAdmin) {
            return responseUtils.okResponse(res, foundAdmin);
        }
        return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Admin'));
    } catch (error) {
        return responseUtils.interServerErrorResponse(res);
    }
}

module.exports = { create, signIn, getProfile }
