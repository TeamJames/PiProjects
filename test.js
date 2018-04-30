'use strict';

console.log('Welcome');
var Gpio = require('onoff').Gpio;
var ONE = new Gpio(21, 'out');
var TWO = new Gpio(18, 'out');
var THREE = new Gpio(26, 'out');
var FOUR = new Gpio(20, 'out');
var FIVE = new Gpio(19, 'out');
var SIX = new Gpio(16, 'out');
var SEVEN = new Gpio(13, 'out');
var EIGHT = new Gpio(12, 'out');
var buttonDown = new Gpio(4, 'in', 'falling');
var buttonUp = new Gpio(17, 'in', 'rising');
var county = 1;


buttonUp.watch(function(err, value){
    if(err){
        console.error('there was an error', err);
    };
    if(county > 0){
        ONE.writeSync(1);
    };
    if(county > 1){
        TWO.writeSync(1);
    };
    if(county > 2){
        THREE.writeSync(1);
    };
    if(county > 3){
        FOUR.writeSync(1);
    };
    if(county > 4){
        FIVE.writeSync(1);
    };
    if(county > 5){
        SIX.writeSync(1);
    };
    if(county > 6){
        SEVEN.writeSync(1);
    };
    if(county > 7){
        EIGHT.writeSync(1);
    };
    if(county > 8){
        return unexportOnClose();
    };
});

buttonDown.watch(function(err, value){
    if(err){
        console.error('there was an error', err);
        return
    };
    ONE.writeSync(0);
    TWO.writeSync(0);
    THREE.writeSync(0);
    FOUR.writeSync(0);
    FIVE.writeSync(0);
    SIX.writeSync(0);
    SEVEN.writeSync(0);
    EIGHT.writeSync(0);
    county++;
});
function unexportOnClose(){
    ONE.writeSync(0);
    TWO.writeSync(0);
    THREE.writeSync(0);
    FOUR.writeSync(0);
    FIVE.writeSync(0);
    SIX.writeSync(0);
    SEVEN.writeSync(0);
    EIGHT.writeSync(0);
    ONE.unexport();
    TWO.unexport();
    THREE.unexport();
    FOUR.unexport();
    FIVE.unexport();
    SIX.unexport();
    SEVEN.unexport();
    EIGHT.unexport();
    buttonUp.unexport();
    buttonDown.unexport();
    console.log('Thank You!');
};
process.on('SIGINT', unexportOnClose);