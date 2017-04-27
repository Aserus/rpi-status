var express = require('express');
var router = express.Router();
var humanize = require('humanize');
var os = require('os');

var lastRandom = JSFunc.randomWords(10);


router.use(function (req, res, next) {
	lastRandom = JSFunc.randomWords(10);
	res.locals._random = lastRandom;

	res.locals.pageCssClass = 'bpi-page-other';
	res.locals.bodyClasses = [];

	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', osInfo:os });
});

router.get('/env', function(req, res, next) {
  res.json(process.env);
});



module.exports = router;
