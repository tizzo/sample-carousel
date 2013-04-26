var fs = require('fs');
var http = require('http');
var filed = require('filed');

// Specify a server slowdown in miliseconds.
var slowDown = 1;

var slow = function(next) {
  var nextThing = next;
  var closure = function(req, res) {
    var args = arguments;
    setTimeout(function(req, res) {
      nextThing.apply({}, args);
    }, slowDown);
  };
  return closure;
}
var server = http.createServer(slow(function(req, res) {
  var path = req.url.substring(1);
  if (!path) {
    path = 'index.html';
  }
  req.pipe(filed(path)).pipe(res);
}));

var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log('Now listening on port ' + port);
});
