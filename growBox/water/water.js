//  use button to simulate thirstyGirl event

'use strict';

var Gpio = require('onoff').Gpio;
// var buttonUp = new Gpio(4, 'in', 'rising');
var buttonDown = new Gpio(26, 'in', 'falling');

let counter = 0;

buttonDown.watch(function(err, value){
    if(err){
        console.error('There was an error', err);
        return;
    };
    counter +=1;
    console.log('button falling value:     ', value);
    console.log('Counter: ', counter);
    // RED.writeSync(0);
    // GREEN.writeSync(1);
});
// buttonDown.watch(function(err, value){
//     if(err){
//         console.error('There was an error', err);
//         return;
//     }
//     RED.writeSync(1);
//     GREEN.writeSync(0);
// });
function unexportOnClose(){
    // RED.writeSync(0);
    // RED.unexport();
    // GREEN.writeSync(0);
    // GREEN.unexport();
    // buttonUp.unexport();
    buttonDown.unexport();
};

process.on('SIGINT', unexportOnClose);