var fs = require('fs-extra');
var tesseract = require('node-tesseract');
var base36KeyGenerator = require('./../services/base36-key-generator');

module.exports = function (app) {
  app.post('/receipts', function (req, res, next) {
    req.pipe(req.busboy);

    req.busboy
      .on('file', function (field, file, name) {
        var tmpName = base36KeyGenerator.generateKey();
        var tmpPath = __dirname + '/' + tmpName;
        var stream = fs.createWriteStream(tmpPath);
        file.pipe(stream);

        stream
          .on('close', function () {
            tesseract.process(tmpPath, function (err, text) {
              if (err) {
                console.error(err);
                res.sendStatus(500);
              }
              else {
                res.status(200).send(text);
              }
              // Delete the temp file once OCR is complete
              fs.unlink(tmpPath);
            });
          })
          .on('error', function (err) {
            console.log(err);
            res.sendStatus(500);
          });
      });
  });
};