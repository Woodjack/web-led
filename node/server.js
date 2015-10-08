var http = require('http');
var requestLib = require('request');
var config = require('./config')

var server = http.createServer(function (request, response) {
  console.log("Request: " + request.url);

  if (request.url == "/toggleLight") {
    callCommand("led", "toggle", function (state) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      if (state != -1) {
        response.end("Light status: " + (state ? "on" : "off"));
      } else {
        response.end("There was an error :(");
      }
    });
  } else if (request.url == "/lightOn") {
    callCommand("led", "on", function (state) {
      if (state != -1) {
        response.end("Light status: " + (state ? "on" : "off"));
      } else {
        response.end("There was an error :(");
      }
    });
  } else if (request.url == "/lightOff") {
    callCommand("led", "off", function (state) {
      if (state != -1) {
        response.end("Light status: " + (state ? "on" : "off"));
      } else {
        response.end("There was an error :(");
      }
    });
  } else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.end("Page not found :(\n\nTry going to \"" + request.headers.host + "/toggleLight\"!");
  }
});

function callCommand(command, arguments, callback) {
  requestLib.post(
    'https://api.particle.io/v1/devices/' + config.device_id + '/' + command + '?access_token=' + config.access_token,
    { form: { args: arguments } },
    function (e, r, body) {
      if (!e && r.statusCode == 200) {
        callback(parseInt(JSON.parse(body).return_value));
      } else {
        callback(-1);
      }
    }
  );
}

server.listen(8080);

console.log("Server bound to localhost:8080");
