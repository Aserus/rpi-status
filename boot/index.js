module.exports = function (app) {
    var colors = require('colors/safe');
    var humanize = require('humanize');
    var config = require("../config");
    var path = require('path');
    var fs = require('fs');
    var async = require('async');

    global.JSApp = {};
    global.JSRoute = {};
    global.JSPath={};
    global.JSDatabase={};
    global.JSFunc = {};
    global.JSLog = {};
    global.JSFilesQueue = {};
    global.JSForm = {};
    global.JSError = {};
    global.JSAsync = async;

    JSPath = {
    	base:	path.join(__dirname,'../'),
    	tmp:	path.join(__dirname,'../', 'tmp'),
    	views:	path.join(__dirname,'../', 'views'),
    	languages:	path.join(__dirname,'../', 'languages'),
    	public:	path.join(__dirname,'../', 'public'),
    	models:	path.join(__dirname,'../', 'models'),
    	media:	path.join(__dirname,'../', 'public', 'media')
    }


    JSPath.join = function(d1,p1){
      if(!p1) return path.join(this.base,d1);
      return path.join(this.base,d1,p1);
    }


    JSApp.getConfigs = function(){
      return config;
    }
    JSApp.getConfig = function(params){
      return config.get(params);
    }

    JSApp.logMemory = function(){
      var memory = process.memoryUsage();
      console.log(colors.grey("# Memory usage: ") + colors.cyan(humanize.filesize(memory.heapUsed) + " / " + humanize.filesize(memory.heapTotal)));
    }

    JSLog = require('../helpers/clog.js');
    JSFunc = require("../helpers/functions");
    //JSForm = require("../helpers/form");



    require("./express")(app);

    //require("./passport")(app);

    //require("./view")(app);

    JSError = require("./error")



    var port = JSFunc.normalizePort(process.env.PORT || JSApp.getConfig('app:port'));

    if(port == 80){
  //    config.set('app:url','http://localhost');
    }else if(port == 3000){
  //    config.set('app:url','http://localhost:'+port);
    }

};
