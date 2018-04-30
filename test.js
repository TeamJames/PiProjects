'use strict';

console.log('Welcome');
var Gpio = require('onoff').Gpio;
var ONE = new Gpio(21, 'out');
var buttonDown = new Gpio(4, 'in', 'falling');
var buttonUp = new Gpio(17, 'in', 'rising');

buttonDown.watch(function(err, value){
    if(err){
        console.error('there was an error', err);
        return;
    }
    ONE.writeSync(0);
});
buttonUp.watch(function(err, value){
    if(err){
        console.error('there was an error', err);
        return;
    }
    ONE.writeSync(1);
})
function unexportOnClose(){
    ONE.writeSync(0);
    ONE.unexport();
    buttonUp.unexport();
    buttonDown.unexport();
    console.log('Thank You!');
};
process.on('SIGINT', unexportOnClose);