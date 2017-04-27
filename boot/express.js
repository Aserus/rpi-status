module.exports = function (app) {

	var express = require('express');
	var path = require('path');
	var favicon = require('serve-favicon');
	var logger = require('morgan');

	var bodyParser = require('body-parser');
  var busboy = require('connect-busboy');

  var expressLess = require('express-less');

	app.set('port', JSFunc.normalizePort(process.env.PORT || JSApp.getConfig('app:port')));
	app.set('views', JSPath.views);
	app.set('view engine', 'pug');

	//app.use('/themes/'+JSApp.getConfig('app:theme')+'/less-css', expressLess(path.join(JSPath.theme, 'less')));

/*
	app.use('/themes/aspid/css', function(){
		return res
	});
	*/
	app.use('/css', expressLess(path.join(JSPath.public, '/less')));


  app.use(favicon(path.join(JSPath.public, 'favicon.ico')));
  app.use(express.static(JSPath.public));

  app.use(busboy());
	app.use(logger('dev'));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(require('./express/index.js'));

	app.use('/', require('../routes'));
}
