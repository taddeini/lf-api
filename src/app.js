var express = require('express');
var compression = require('compression');
var busboy = require('connect-busboy');

module.exports = function(env) {
  var app = express();
  app.use(compression());
  app.use(busboy());
  
  require('./controllers/health')(app);
  require('./controllers/receipts')(app);
  
  return app;
};
