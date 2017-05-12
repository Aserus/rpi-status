var fs = require('fs');
var RRD = require('rrd').RRD;
var mathHelper = require(JSPath.join('/helpers/math.js'));


function Detector(options,dataFile){
  this.options = options;
  this.dataFile = dataFile;
  this.rrd = new RRD(dataFile);
}


Detector.prototype.check = function(callback){
  if(!this.rrd_args) throw 'rrd args is empty';
  fs.stat(this.dataFile, (err) => {
    if(err) return this.createRRD(callback)
    callback(null);
  });
  return this;
}


Detector.prototype.createRRD = function(callback){
  this.rrd.create(this.rrd_args, {}, (err)=>{
    if(err) throw err;
    callback(err);
  });
  return this;
}



Detector.prototype.startTracking = function(){
  this.check(()=>{
    setInterval(()=>{
      this.processTracking();
    },(this.options.delay || 5)*1000);
  });
  return this;
}



Detector.prototype.processTracking = function(){
  this.getData((err,data)=>{
    if(err) return;
    data= this.processData(data);
    this.saveData(data);
    if(this.options.log){
      this.logData(data);
    }
  });
  return this;
}

Detector.prototype.init = function(params){
  this.rrd_args = params.rrdArgs;
  if(params.getData)
    this.getData = params.getData;
  if(params.logData)
    this.logData = params.logData;
  if(params.saveData)
    this.saveData = params.saveData;
  if(params.processData)
    this.processData = params.processData;

  return this;
}


Detector.prototype.prepareData = function(data){

  if(this.options.multiplication){
    data = data * this.options.multiplication;
  }
  if(this.options.division){
    data = data / this.options.division;
  }

  if(this.options.round || this.options.round===0){
    data = mathHelper.round(data,this.options.round);
  }
  return data;
}


Detector.prototype.processData = function(data){
  return this.prepareData(data);
}

Detector.prototype.getData = function(){
  return;
}

Detector.prototype.logData = function(){
  return;
}
Detector.prototype.saveData = function(){
  return;
}

module.exports = Detector;
