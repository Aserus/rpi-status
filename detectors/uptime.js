var os = require('os');
var Detector = require('./lib/detector');



function formatPad(s){
  return (s < 10 ? '0' : '') + s;
}

function format(seconds){
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);
  return formatPad(hours) + ':' + formatPad(minutes) + ':' + formatPad(seconds);
}




function getData(callback){
  callback(null,os.uptime())
}
function saveData(data){
  this.rrd.update(new Date, [data], (err) =>{ });
}
function logData(data){
  JSLog.info('uptime       = '+format(data));
}

//http://www.tux.in.ua/articles/1098

module.exports = function (name,options,dataFile) {

  var detector = new Detector(options,dataFile);

  detector.init({
    rrdArgs:["DS:uptime:GAUGE:600:0:U", "RRA:AVERAGE:0.5:1:300"],
    getData: getData,
    logData: logData,
    saveData: saveData
  }).startTracking();;



  return detector;
}
