var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

app.use(express.static( __dirname + '/app' ));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

app.listen(3000, function () {
  console.log("Run Application on Port : 3000");
});