// github i swear ta gawd
'use strict';
console.log('Welcome!');
var Gpio = require('onoff').Gpio;
var RED = new Gpio(12, 'out');
var GREEN = new Gpio(21, 'out');
var buttonUp = new Gpio(4, 'in', 'rising');
var buttonDown = new Gpio(26, 'in', 'falling');
buttonUp.watch(function(err, value){
    if(err){
        console.error('There was an error', err);
        return;
    };
    RED.writeSync(0);
    GREEN.writeSync(1);
});
buttonDown.watch(function(err, value){
    if(err){
        console.error('There was an error', err);
        return;
    }
    RED.writeSync(1);
    GREEN.writeSync(0);
});
function unexportOnClose(){
    RED.writeSync(0);
    RED.unexport();
    GREEN.writeSync(0);
    GREEN.unexport();
    buttonUp.unexport();
    buttonDown.unexport();
    console.log('Thank You!');
};

process.on('SIGINT', unexportOnClose);