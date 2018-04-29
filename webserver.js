'use strict';

var http = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io')(http);
var Gpio = require('onoff').Gpio;
var RED = new Gpio(26, 'out');
var pushButton = new Gpio(17, 'out', 'both');

http.listen(8080);

function handler (req, res) { //create server
    fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
      res.write(data); //write data from index.html
      return res.end();
    });
  }
  
  io.sockets.on('connection', function(socket){
    var lightValue = 0;
    pushButton.watch(function(err, value){
      if(err){
        console.error('There was an error', err);
        return;
      };
      console.log('button was pushed');
      lightValue = value;
      socket.emit('light', lightValue);
    });
    socket.on('light', function(data){
      lightValue = data;
      if (lightValue != RED.readSync()) {
        RED.writeSync(lightValue);
        // console.log(lightValue);
      }
    });
  });

  process.on('SIGINT', function(){
    RED.writeSync(0);
    RED.unexport();
    pushButton.unexport();
    process.exit();
  });