var express = require('express');
var router = express.Router();

const author = require('../middleware/author');
const Validator = require('../middleware/validator')

const ValidatorConfig = require('../util/validatorConfig')

const subCategoryController = require('../controllers/sub-category-controller')

router.post('/', Validator.validatorReqBody(ValidatorConfig.subCategoryCreateReqBodyValidatorConfig), author, subCategoryController.create)

router.get('/', Validator.validatorReqQuery(ValidatorConfig.subCategoryReqQueryValidatorConfig), subCategoryController.getAll)

router.get('/:id', Validator.validatorReqPath(ValidatorConfig.newsReqPathValidatorConfig), subCategoryController.getById)

router.put('/:id', Validator.validatorReqPath(ValidatorConfig.newsReqPathValidatorConfig), Validator.validatorReqBody(ValidatorConfig.subCategoryUpdateReqBodyValidatorConfig), author, subCategoryController.updateById)

router.delete('/:id', Validator.validatorReqPath(ValidatorConfig.newsReqPathValidatorConfig), author, subCategoryController.deleteById)

module.exports = router;
