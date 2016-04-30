var fs = require('fs-extra');
var base36KeyGenerator = require('./../services/base36-key-generator');

module.exports = function (app) {
  app.post('/receipts', function (req, res, next) {

    req.pipe(req.busboy);
    req.busboy.on('file', function (field, file, name) {      
      var tmpName = base36KeyGenerator.generateKey();
      var tmpPath = __dirname + '/tmp/' + tmpName;
      var stream = fs.createWriteStream(tmpPath);
      file.pipe(stream);      
    });

    res.sendStatus(200);
  });
};