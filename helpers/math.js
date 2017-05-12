

module.exports = {

  round: function(n,z){
    if(!z) return Math.round(n);
    return Math.round(n * Math.pow(10,z)) / Math.pow(10,z);
  }


}
