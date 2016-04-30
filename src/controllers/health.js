module.exports = function (app) {
  app.get('/_health', function (req, res) {
    res.sendStatus(200);
  });
};