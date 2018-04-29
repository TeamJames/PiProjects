'use strict';

var Gpio = require('onoff').Gpio;
var RED = new Gpio(12, 'out');
var pushButton = new Gpio(4, 'in', 'both');

pushButton.watch(function(err, value){
    if(err){
        console.error('There was an error', err);
        return;
    }
    RED.writeSync(value);
});

function unexportOnClose(){
    RED.writeSync(0);
    RED.unexport();
    pushButton.unexport();
};

process.on('SIGINT', unexportOnClose);