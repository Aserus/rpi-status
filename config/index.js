var path = require('path');
var	nconf = require('nconf');

  nconf.argv()
       .env()
       .file(path.join(__dirname,'config.json'))
       //.add('detectors', { type: 'file', file: path.join(__dirname,'detectors.json') })
       .file('detectors',path.join(__dirname,'detectors.json') );

module.exports=nconf;
