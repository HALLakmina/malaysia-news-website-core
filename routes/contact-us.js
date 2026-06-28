var express = require('express');
var router = express.Router();


const Validator = require('../middleware/validator')
const ValidatorConfig = require('../util/validatorConfig')
const contactUsController = require('../controllers/contact-us-controller')


router.post("/", Validator.validatorReqBody(ValidatorConfig.contactUsReqBodyValidatorConfig), contactUsController.create)


module.exports = router
