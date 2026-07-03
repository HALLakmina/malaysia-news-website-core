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

const getByValue = async (req, res, next) => {
    try {
        const { category } = req.params
        const foundCategory = await categoryService.getCategory(category)
        if (!foundCategory) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Category'))
        }
        return responseUtils.okResponse(res, foundCategory)
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

const updateByValue = async (req, res, next) => {
    try {
        const { category } = req.params
        const userId = req.user.id
        const payload = req.body
        const updatedCategory = await categoryService.updateCategory(category, payload, userId)
        if (!updatedCategory) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Category'))
        }
        return responseUtils.updateResponse(res, responseMessages.common.updatedById('Category', category))
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

const deleteByValue = async (req, res, next) => {
    try {
        const { category } = req.params
        const deletedCategory = await categoryService.deleteCategory(category)
        if (!deletedCategory) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Category'))
        }
        return responseUtils.deleteResponse(res, responseMessages.common.deletedById('Category'))
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

const getSubCategories = async (req, res, next) => {
    try {
        const { category } = req.params
        const subCategories = await categoryService.getSubCategories(category)
        if (subCategories === null) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Category'))
        }
        return responseUtils.okResponse(res, subCategories)
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

const createSubCategory = async (req, res, next) => {
    try {
        const { category } = req.params
        const userId = req.user.id
        const payload = req.body
        const updatedCategory = await categoryService.createSubCategory(category, payload, userId)
        if (!updatedCategory) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Category'))
        }
        return responseUtils.createResponseWithJson(res, updatedCategory)
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

const updateSubCategory = async (req, res, next) => {
    try {
        const { category, subCategory } = req.params
        const userId = req.user.id
        const payload = req.body
        const updatedCategory = await categoryService.updateSubCategory(category, subCategory, payload, userId)
        if (!updatedCategory) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Sub Category'))
        }
        return responseUtils.updateResponse(res, responseMessages.common.updatedById('Sub Category', subCategory))
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

const deleteSubCategory = async (req, res, next) => {
    try {
        const { category, subCategory } = req.params
        const updatedCategory = await categoryService.deleteSubCategory(category, subCategory)
        if (!updatedCategory) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Sub Category'))
        }
        return responseUtils.deleteResponse(res, responseMessages.common.deletedById('Sub Category'))
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

module.exports = {
    create,
    getAll,
    getByValue,
    updateByValue,
    deleteByValue,
    getSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
}
