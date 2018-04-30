'use strict';

console.log('Welcome');
var Gpio = require('onoff').Gpio;
var ONE = new Gpio(21, 'out');
var TWO = new Gpio(18, 'in');
var THREE = new Gpio(26, 'in');
var FOUR = new Gpio(20, 'in');
var FIVE = new Gpio(19, 'in');
var SIX = new Gpio(16, 'in');
var SEVEN = new Gpio(13, 'in');
var EIGHT = new Gpio(12, 'in');
var buttonDown = new Gpio(4, 'in', 'falling');
var buttonUp = new Gpio(17, 'in', 'rising');
var county = 1;

// buttonDown.watch(function(err, value){
//     if(err){
//         console.error('there was an error', err);
//         return;
//     }
//     ONE.writeSync(0);
// });
function lightUp(){
    if(county > 0){
        ONE.writeSync(1);
    }
    if(county > 1){
        TWO.writeSync(1);
    };
    if(county > 2){
        THREE.writeSync(1)
    }
};
buttonUp.watch(function(err, value){
    if(err){
        console.error('there was an error', err);
        return;
    }
    lightUp();
    county +=1;
})
function unexportOnClose(){
    ONE.writeSync(0);
    TWO.writeSync(0);
    THREE.writeSync(0);
    ONE.unexport();
    TWO.unexport();
    THREE.unexport();
    buttonUp.unexport();
    buttonDown.unexport();
    console.log('Thank You!');
};
process.on('SIGINT', unexportOnClose);