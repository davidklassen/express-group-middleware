var express = require('express');
var app = express();
var group = require('..')(app);

var auth = function (req, res, next) {
  console.log('authenticating...');

  next();
};

var logStart = function (req, res, next) {
  console.log('Start: %d', new Date);

  next();
};

var otherMiddleware = function (req, res, next) {
  console.log('foo..');

  next();
}

group(function () {
  app.get('/public', function (req, res) {
    res.send('public action');
  });

  group(function () {
    app.get('/private', function (req, res) {
      res.send('private action, should be authenticated');
    });

    app.get('/private2', function (req, res) {
      res.send('another private action, should be authenticated');
    });
  }).before([auth, otherMiddleware]);

  app.get('/public2', function (req, res) {
    res.send('another public action');
  });
}).before(logStart);

app.listen(8080, function () {
  console.log('Listening on port 8080.');
});
