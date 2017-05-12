var inherits = require('util').inherits;

function JSErrorClass(status,msg,customProperty){
  Error.captureStackTrace(this, this.constructor);
  this.message = msg;
  this.status = status;
  this.customProperty = customProperty;
}
inherits(JSErrorClass, Error);

module.exports = JSErrorClass;
