var express = require('express');
var router = express.Router();


function getStylesheets(){
  var out = [];
  var list = JSApp.getConfig('html:css');
  list.forEach(function(item) {
    out.push(item);
  });
  return out;
}

function getScripts(){
  var out = [];
  var list = JSApp.getConfig('html:js');
  list.forEach(function(item) {
    out.push(item);
  });
  return out;
}

router.use(function(req,res,next){
  res.locals.getScriptList = getScripts;
  res.locals.getStylesheetList = getStylesheets;
  next();
});


module.exports = router;
