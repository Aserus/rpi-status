var fs = require('fs');


var Detector = require('./lib/detector');

function getData(callback){
  fs.readFile('/sys/devices/virtual/thermal/thermal_zone0/temp',(err,data)=>{
    callback(err,parseFloat(data))
  });
}
function logData(data){
  JSLog.info('cpu temp      = '+data+'°C');
}

function saveData(data){
  this.rrd.update(new Date, [data], (err) =>{ });
}


module.exports = function (name,options,dataFile) {

  var detector = new Detector(options,dataFile);

  detector.init({
    rrdArgs:["DS:temperature:GAUGE:600:U:U", "RRA:AVERAGE:0.5:1:300"],
    getData: getData,
    logData: logData,
    saveData: saveData
  }).startTracking();;



  return detector;
}
