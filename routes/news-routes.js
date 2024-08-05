var express = require('express');
var router = express.Router();

const author = require('../middleware/author');
const Validator = require('../middleware/validator')

const queryExtractor = require('../util/queryExtractor')
const ValidatorConfig = require('../util/validatorConfig')
const responseMessages = require('../util/responseMessages');
const responseUtils = require('../util/responseUtil')

const newsService = require('../services/news-services')

router.post('/', Validator.validatorReqBody(ValidatorConfig.newsReqBodyValidatorConfig), author, async (req, res, next) => {
    try{
        const id = req.user.id
        const payload = req.body
        const news = await newsService.create(payload, id)
        return responseUtils.createResponseWithJson(res, news)
    }
    catch(error) {
        console.log(error)
        return responseUtils.interServerErrorResponse(res);
    }
})

router.get('/', Validator.validatorReqQuery(ValidatorConfig.newsReqQuerySortValidatorConfig), async (req, res, next) => {
    const searchObj = queryExtractor.getSearchObj(req.query)  
    const paginationObj = queryExtractor.getPaginationObj(req.query)
    const sortObj = queryExtractor.getSortObj(req.query)
    const {category, language } = req.query

    try {
        const news = await newsService.findByQueryWithPagination({ ...searchObj}, category, language, paginationObj, sortObj)
        return responseUtils.okResponse(res, news);
    } 
    catch (e) {
        return responseUtils.interServerErrorResponse(res);
    }
})

router.put('/:id',Validator.validatorReqPath(ValidatorConfig.newsReqPathValidatorConfig), Validator.validatorReqBody(ValidatorConfig.newsReqBodyValidatorConfig), author, async (req, res, next) => {
try {
    const id = req.params.id;
    const userId = req.user.id;
    const payload = req.body;
    const isFoundProgram = await newsService.findByIdAll(id);
    if (!isFoundProgram) {
        return responseUtils.notFoundResponse(res,responseMessages.common.notFound('News'));
    }else{
    await newsService.updateById(id, payload, userId)
    return responseUtils.updateResponse(res,responseMessages.common.updatedById('News',id));
}
} catch (err) {
    return responseUtils.interServerErrorResponse(res);
}
});


router.patch('/:id', Validator.validatorReqPath(ValidatorConfig.newsReqPathValidatorConfig), Validator.validatorReqBody(ValidatorConfig.newsReqBodyPatchValidatorConfig), author, async (req, res, next) => {
try {
    const id = req.params.id;
    const userId = req.user.id;
    const payload = req.body;
    const isFoundProgram = await newsService.findByIdAll(id);
    if (!isFoundProgram) {
        return responseUtils.notFoundResponse(res,responseMessages.common.notFound('News'));
    }else{
    await newsService.updateById(id, payload, userId)
    return responseUtils.updateResponse(res,responseMessages.common.updatedById('News'));
    }
} catch (err) {
    return responseUtils.interServerErrorResponse(res);
}
});


router.delete('/:id', Validator.validatorReqPath(ValidatorConfig.newsReqPathValidatorConfig), author, async (req, res, next) => {
try {
    const id = req.params.id;
    const userId = req.user.id;
    const isFoundProgram = await newsService.findByIdAll(id);
    if (!isFoundProgram) {
        return responseUtils.notFoundResponse(res,responseMessages.common.notFound('News'));
    }else{
    await newsService.deleteById(id, userId);
    return responseUtils.deleteResponse(res,responseMessages.common.deletedById('News'));
    }
} catch (err) {
    return responseUtils.interServerErrorResponse(res);
}
});

module.exports = router;