var express = require('express');
var compression = require('compression');

module.exports = function(env) {
  var app = express();
  app.use(compression());
  
  require('./controllers/health')(app);
  require('./controllers/receipts')(app);
  
  return app;
};
