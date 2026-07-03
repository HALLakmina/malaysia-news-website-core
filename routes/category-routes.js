var express = require('express');
var router = express.Router();

const author = require('../middleware/author');
const Validator = require('../middleware/validator')

const ValidatorConfig = require('../util/validatorConfig')

const categoryController = require('../controllers/category-controller')

router.post('/', Validator.validatorReqBody(ValidatorConfig.categoryReqBodyValidatorConfig), author, categoryController.create)

router.get('/', categoryController.getAll)

router.get('/:category', Validator.validatorReqPath(ValidatorConfig.categoryReqPathValidatorConfig), categoryController.getByValue)

router.put('/:category', Validator.validatorReqPath(ValidatorConfig.categoryReqPathValidatorConfig), Validator.validatorReqBody(ValidatorConfig.categoryReqBodyValidatorConfig), author, categoryController.updateByValue)

router.delete('/:category', Validator.validatorReqPath(ValidatorConfig.categoryReqPathValidatorConfig), author, categoryController.deleteByValue)

router.get('/:category/sub-category', Validator.validatorReqPath(ValidatorConfig.categoryReqPathValidatorConfig), categoryController.getSubCategories)

router.post('/:category/sub-category', Validator.validatorReqPath(ValidatorConfig.categoryReqPathValidatorConfig), Validator.validatorReqBody(ValidatorConfig.subCategoryReqBodyValidatorConfig), author, categoryController.createSubCategory)

router.put('/:category/sub-category/:subCategory', Validator.validatorReqPath(ValidatorConfig.subCategoryReqPathValidatorConfig), Validator.validatorReqBody(ValidatorConfig.subCategoryReqBodyValidatorConfig), author, categoryController.updateSubCategory)

router.delete('/:category/sub-category/:subCategory', Validator.validatorReqPath(ValidatorConfig.subCategoryReqPathValidatorConfig), author, categoryController.deleteSubCategory)

module.exports = router;
