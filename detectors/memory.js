var os = require('os');


var Detector = require('./lib/detector');

function getData(callback){
  var data = {
    'total':os.totalmem(),
    'free':os.freemem()
  }
  data.used = data.total - data.free;
  callback(null,data)
}
function logData(data){
  JSApp.logMemory();
  JSLog.info('mem used      = '+JSFunc.humanize.filesize(data.used*1024)+' ('+parseInt(data.used/data.total*100)+'%)');
}
function saveData(data){
  this.rrd.update(new Date, [data.used], (err) =>{ });
}

function processData(data){
  for(var i in data){
    data[i] = this.prepareData(data[i]);
  }
  return data;
}


module.exports = function (name,options,dataFile) {

  var detector = new Detector(options,dataFile);

  detector.init({
    rrdArgs:["DS:memory_total:GAUGE:600:0:U","DS:memory_used:GAUGE:600:0:U","DS:memory_free:GAUGE:600:0:U", "RRA:AVERAGE:0.5:1:300"],
    getData: getData,
    logData: logData,
    saveData: saveData,
    processData: processData
  }).startTracking();;



  return detector;
}
