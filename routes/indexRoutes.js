var express = require('express');
var router = express.Router();
const responseUtils = require('../util/responseUtil')

/* GET home page. */
router.get('/', function(req, res, next) {
  return responseUtils.okResponse(res);
});

module.exports = router;
