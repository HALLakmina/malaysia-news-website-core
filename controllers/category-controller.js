const responseUtils = require('../util/responseUtil')
const responseMessages = require('../util/responseMessages')
const categoryService = require('../services/category-services')

const create = async (req, res, next) => {
    try {
        const id = req.user.id
        const payload = req.body
        const category = await categoryService.create(payload, id)
        return responseUtils.createResponseWithJson(res, category)
    }
    catch (error) {
        if (error.message === 'CONFLICT') {
            return responseUtils.conflictErrorResponseMessageToJson(res, `Category with value '${req.body.value}' already exists.`)
        }
        console.log(error)
        return responseUtils.interServerErrorResponse(res)
    }
}

const getAll = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategory()
        return responseUtils.okResponse(res, categories)
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const foundCategory = await categoryService.getCategory(id)
        if (!foundCategory) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Category'))
        }
        return responseUtils.okResponse(res, foundCategory)
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

const updateById = async (req, res, next) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        const payload = req.body
        const updatedCategory = await categoryService.updateCategory(id, payload, userId)
        if (!updatedCategory) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Category'))
        }
        return responseUtils.updateResponse(res, responseMessages.common.updatedById('Category', id))
    }
    catch (error) {
        if (error.message === 'CONFLICT' || error.code === 11000) {
            return responseUtils.conflictErrorResponseMessageToJson(res, `Category with value '${req.body.value}' already exists.`)
        }
        console.log(error)
        return responseUtils.interServerErrorResponse(res)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedCategory = await categoryService.deleteCategory(id)
        if (!deletedCategory) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Category'))
        }
        return responseUtils.deleteResponse(res, responseMessages.common.deletedById('Category'))
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

module.exports = { create, getAll, getById, updateById, deleteById }
