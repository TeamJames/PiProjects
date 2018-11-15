'use strict';

const Gpio = require('onoff').Gpio;

const pumpButton = new Gpio(19, 'in', 'rising');
const pumpRelay = new Gpio(13, 'out');

function waterStart(){
  console.log('Water Pump ON');
  pumpRelay.writeSync(1);
  setTimeout(waterStop, 1000);
};

function waterStop(){
  console.log('Water Pump OFF');
  pumpRelay.writeSync(0);
};

pumpButton.watch(function(err){
    if(err){
        return console.error(err);
    }
    waterStart();
});