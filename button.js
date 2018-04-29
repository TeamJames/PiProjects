'use strict';
console.log('Welcome!');
var Gpio = require('onoff').Gpio;
var RED = new Gpio(12, 'out');
var GREEN = new Gpio(16, 'out');
var pushButton = new Gpio(4, 'in', 'both');

pushButton.watch(function(err, value){
    if(err){
        console.error('There was an error', err);
        return;
    }
    RED.writeSync(value);
    toggleGreen();
});

function toggleGreen(){
    if(GREEN.readSync === 0){
        GREEN.writeSync(1);
    } else {
        GREEN.writeSync(0);
    }
};

function unexportOnClose(){
    RED.writeSync(0);
    RED.unexport();
    pushButton.unexport();
};

process.on('SIGINT', unexportOnClose);