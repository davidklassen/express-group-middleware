var express = require('express');
var app = express();
var group = require('..')(app);

var auth = function (req, res, next) {
  console.log('authenticating...');

  next();
};

app.get('/public', function (req, res) {
  res.send('public action');
});

group.before(auth, function () {
  app.get('/private', function (req, res) {
    res.send('private action, should be authenticated');
  });

  app.get('/private2', function (req, res) {
    res.send('another private action, should be authenticated');
  });
});

app.get('/public2', function (req, res) {
  res.send('another public action');
});

app.listen(8080, function () {
  console.log('Listening on port 8080.');
});
