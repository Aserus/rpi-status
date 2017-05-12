
var fs = require('fs');
var RRD = require('rrd').RRD;
//require('./temp');
//require('./uptime');



function initDetector(detector,options){

  var taskIndex=[];

  taskIndex.push((callback)=>{
    var handlerFile = JSPath.join('/detectors',detector+'.js');
    fs.access(handlerFile, fs.constants.R_OK, (err) => {
      if(err) {
        console.log(detector+' - js handler not found -> '+handlerFile);
        throw err;
      }
      callback(err,handlerFile);
    });
  });


  JSAsync.waterfall(taskIndex, (err, handlerFile)=> {
    if(err) throw err;

    var dataFile = JSPath.join('/public/data',detector+'.rrd');
    require(handlerFile)(detector,options,dataFile);
  });

}

for (var detector in JSApp.getConfig('detectors')){
  initDetector(detector,JSApp.getConfig('detectors')[detector]);
}
