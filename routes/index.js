var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(' Hi!! Mahbub. Welcome to Express.');
});

module.exports = router;
