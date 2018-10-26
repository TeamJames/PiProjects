//  use button to simulate thirstyGirl event

'use strict';

var Gpio = require('onoff').Gpio;
// var buttonUp = new Gpio(4, 'in', 'rising');
var green = new Gpio(4, 'out');
var buttonDown = new Gpio(26, 'out', 'falling');

let counter = 0;

buttonDown.watch(function(err, value){
    if(err){
        console.error('There was an error', err);
        return;
    };
    counter +=1;
    console.log('Counter: ', counter);
    green.writeSync(1);
});

function unexportOnClose(){
    green-.writeSync(0);
    green-.unexport();
    buttonDown.unexport();
};

process.on('SIGINT', unexportOnClose);