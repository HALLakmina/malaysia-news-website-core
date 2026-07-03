const responseUtils = require('../util/responseUtil')
const responseMessages = require('../util/responseMessages')
const subCategoryService = require('../services/sub-category-services')

const create = async (req, res, next) => {
    try {
        const userId = req.user.id
        const payload = req.body
        const subCategory = await subCategoryService.create(payload, userId)
        return responseUtils.createResponseWithJson(res, subCategory)
    }
    catch (error) {
        if (error.message === 'CONFLICT') {
            return responseUtils.conflictErrorResponseMessageToJson(res, `Sub Category with value '${req.body.value}' already exists in this category.`)
        }
        if (error.message === 'CATEGORY_NOT_FOUND') {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Category'))
        }
        console.log(error)
        return responseUtils.interServerErrorResponse(res)
    }
}

const getAll = async (req, res, next) => {
    try {
        const { category } = req.query
        const subCategories = await subCategoryService.getAll(category)
        return responseUtils.okResponse(res, subCategories)
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const subCategory = await subCategoryService.getById(id)
        if (!subCategory) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Sub Category'))
        }
        return responseUtils.okResponse(res, subCategory)
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
        const updatedSubCategory = await subCategoryService.update(id, payload, userId)
        if (!updatedSubCategory) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Sub Category'))
        }
        return responseUtils.updateResponse(res, responseMessages.common.updatedById('Sub Category', id))
    }
    catch (error) {
        if (error.message === 'CONFLICT') {
            return responseUtils.conflictErrorResponseMessageToJson(res, `Sub Category with value '${req.body.value}' already exists in this category.`)
        }
        return responseUtils.interServerErrorResponse(res)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedSubCategory = await subCategoryService.deleteById(id)
        if (!deletedSubCategory) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Sub Category'))
        }
        return responseUtils.deleteResponse(res, responseMessages.common.deletedById('Sub Category'))
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

module.exports = { create, getAll, getById, updateById, deleteById }
