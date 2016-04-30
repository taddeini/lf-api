module.exports = function (app) {
  app.get('/receipts', function (req, res) {
    res.sendStatus(200);
  });
};