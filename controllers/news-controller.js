const isAuthor = require('../middleware/isAuthor')
const queryExtractor = require('../util/queryExtractor')
const responseMessages = require('../util/responseMessages')
const responseUtils = require('../util/responseUtil')

const newsService = require('../services/news-services')

const create = async (req, res, next) => {
    try {
        const id = req.user.id
        const payload = req.body
        const news = await newsService.create(payload, id)
        return responseUtils.createResponseWithJson(res, news)
    }
    catch (error) {
        console.log(error)
        return responseUtils.interServerErrorResponse(res);
    }
}

const getNewsCount = async (req, res, next) => {
    const isNotAdmin = !isAuthor
    try {
        const newsCount = await newsService.newsCount(isNotAdmin)
        return responseUtils.okResponse(res, newsCount)
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const isFoundNews = await newsService.findByIdAll(id);
        if (isFoundNews) {
            return responseUtils.okResponse(res, isFoundNews);
        } else {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('News'));
        }
    }
    catch (e) {
        return responseUtils.interServerErrorResponse(res);
    }
}

const getByQuery = async (req, res, next) => {
    const searchObj = queryExtractor.getSearchObj(req.query)
    const paginationObj = queryExtractor.getPaginationObj(req.query)
    const sortObj = queryExtractor.getSortObj(req.query)
    const { category, language } = req.query
    const isNotAdmin = !isAuthor
    try {
        const news = await newsService.findByQueryWithPagination({ ...searchObj }, isNotAdmin, category, language, paginationObj, sortObj)
        return responseUtils.okResponse(res, news);
    }
    catch (e) {
        return responseUtils.interServerErrorResponse(res);
    }
}

const updateById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const payload = req.body;
        const isFoundNews = await newsService.findByIdAll(id);
        if (!isFoundNews) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('News'));
        } else {
            await newsService.updateById(id, payload, userId)
            return responseUtils.updateResponse(res, responseMessages.common.updatedById('News', id));
        }
    } catch (err) {
        return responseUtils.interServerErrorResponse(res);
    }
}

const patchById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const payload = req.body;
        const isFoundProgram = await newsService.findByIdAll(id);
        if (!isFoundProgram) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('News'));
        } else {
            await newsService.updateById(id, payload, userId)
            return responseUtils.updateResponse(res, responseMessages.common.updatedById('News'));
        }
    } catch (err) {
        return responseUtils.interServerErrorResponse(res);
    }
}

const deleteById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const isFoundProgram = await newsService.findByIdAll(id);
        if (!isFoundProgram) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('News'));
        } else {
            await newsService.deleteById(id, userId);
            return responseUtils.deleteResponse(res, responseMessages.common.deletedById('News'));
        }
    } catch (err) {
        return responseUtils.interServerErrorResponse(res);
    }
}

module.exports = {
    create,
    getNewsCount,
    getById,
    getByQuery,
    updateById,
    patchById,
    deleteById
}
