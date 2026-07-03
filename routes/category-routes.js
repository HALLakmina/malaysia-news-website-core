var express = require('express');
var router = express.Router();

const author = require('../middleware/author');
const Validator = require('../middleware/validator')

const ValidatorConfig = require('../util/validatorConfig')

const categoryController = require('../controllers/category-controller')

router.post('/', Validator.validatorReqBody(ValidatorConfig.categoryReqBodyValidatorConfig), author, categoryController.create)

router.get('/', categoryController.getAll)

router.get('/:id', Validator.validatorReqPath(ValidatorConfig.newsReqPathValidatorConfig), categoryController.getById)

router.put('/:id', Validator.validatorReqPath(ValidatorConfig.newsReqPathValidatorConfig), Validator.validatorReqBody(ValidatorConfig.categoryReqBodyValidatorConfig), author, categoryController.updateById)

router.delete('/:id', Validator.validatorReqPath(ValidatorConfig.newsReqPathValidatorConfig), author, categoryController.deleteById)

module.exports = router;
