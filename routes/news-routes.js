var express = require('express');
var router = express.Router();

const author = require('../middleware/author');
const isAuthor = require('../middleware/isAuthor');
const Validator = require('../middleware/validator')

const ValidatorConfig = require('../util/validatorConfig')

const newsController = require('../controllers/news-controller')

router.post('/', Validator.validatorReqBody(ValidatorConfig.newsReqBodyValidatorConfig), author, newsController.create)

router.get('/news-count', isAuthor, newsController.getNewsCount)

router.get('/:id', newsController.getById)

router.get('/', Validator.validatorReqQuery(ValidatorConfig.newsReqQuerySortValidatorConfig), isAuthor, newsController.getByQuery)

router.put('/:id', Validator.validatorReqPath(ValidatorConfig.newsReqPathValidatorConfig), Validator.validatorReqBody(ValidatorConfig.newsReqBodyValidatorConfig), author, newsController.updateById)

router.patch('/:id', Validator.validatorReqPath(ValidatorConfig.newsReqPathValidatorConfig), Validator.validatorReqBody(ValidatorConfig.newsReqBodyPatchValidatorConfig), author, newsController.patchById)

router.delete('/:id', Validator.validatorReqPath(ValidatorConfig.newsReqPathValidatorConfig), author, newsController.deleteById)

module.exports = router;
