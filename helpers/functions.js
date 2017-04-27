var moment = require('moment');
var humanize = require('humanize');

module.exports = {
  randomWords: function(n){
    var s ='';
    while(s.length < n)
      s += Math.random().toString(36).replace(/\d|_/g,'').slice(2, 12);
    return s.substr(0, n);
  },
  randomNumber: function(string_length){
    if(!string_length) string_length=11;
    var chars = "0123456789";
    //var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var randomstring = '';

    for (var x=0;x<string_length;x++) {

        var letterOrNumber = Math.floor(Math.random() * 2);
        if (letterOrNumber == 0) {
            var newNum = Math.floor(Math.random() * 9);
            randomstring += newNum;
        } else {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }

    }
    return randomstring;
  },

  copyObject: function (obj) {
    if (typeof obj != "object") {
        return obj;
    }

    var copy = obj.constructor();
    for (var key in obj) {
        if (typeof obj[key] == "object") {
            copy[key] = this.deepCopy(obj[key]);
        } else {
            copy[key] = obj[key];
        }
    }
    return copy;
  },
  _uniqid: function(){
    var n=Math.floor(Math.random()*11);
    var k = Math.floor(Math.random()* 1000000);
    return String.fromCharCode(n)+k;
  },
  uniqid: function (string_length) {
    if(!string_length) string_length=11;
    var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
    //var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var randomstring = '';

    for (var x=0;x<string_length;x++) {

        var letterOrNumber = Math.floor(Math.random() * 2);
        if (letterOrNumber == 0) {
            var newNum = Math.floor(Math.random() * 9);
            randomstring += newNum;
        } else {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }

    }
    return randomstring;
  },
  numberZero: function(n, needLength) {
    needLength = needLength || 2;
    n = String(n);
    while (n.length < needLength) {
      n = "0" + n;
    }
    return n
  },
  dateFormat: function(d,format){
    return moment(d).format(format);
  },
  dateSql: function(d){
    return this.dateFormat(d,"YYYY-MM-DD hh:mm:ss");
  },
  normalizePort: function(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  },
  validateEmail:function(email){
    if(!email) return false;
    if(email.indexOf('@') <3) return false;
    //if(email.indexOf('@') <3) return false;
    return true;
  },
  humanize:humanize
}
