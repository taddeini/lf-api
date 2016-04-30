var base35KeyGenerator = function () {
  this.generateKey = function () { 
    return (Math.random() * Math.pow(36, 6) << 0).toString(36).slice(-6);
  };    
};

module.exports = new base35KeyGenerator();