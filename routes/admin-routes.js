var express = require('express');
var router = express.Router();

const auth = require('../middleware/author');
const Validator = require('../middleware/validator')

const ValidatorConfig = require('../util/validatorConfig');

const adminController = require('../controllers/admin-controller')

router.post('/', Validator.validatorReqBody(ValidatorConfig.createAdminReqBodyValidatorConfig), auth, adminController.create)

router.post('/sign-in', Validator.validatorReqBody(ValidatorConfig.signInAdminReqBodyValidatorConfig), adminController.signIn)

router.get('/profile', auth, adminController.getProfile)

module.exports = router;
