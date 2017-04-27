var colors = require('colors/safe');

/*
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
*/
module.exports = {
  log: function(v){
    console.log(v);
  },
  warning: function(v){
    console.log(colors.yellow('! '),colors.yellow(v));
  },
  info: function(v){
    console.log(colors.cyan('= '),colors.cyan(v));
  },
  success: function(v){
    console.log(colors.green('+ '),colors.green(v));
  },
  error: function(v){
    console.log(colors.cyan('* '),colors.red(v));
  },
  green: function(v){
    console.log(colors.green(v));
  },
  red: function(v){
    console.log(colors.red(v));
  }

};
