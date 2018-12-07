'use strict';

const Gpio = require('onoff').Gpio;

let pumpRelay = new Gpio(21, 'out');
let pumpIndicatorLight = new Gpio(17, 'out');

pumpRelay.writeSync(0);
pumpIndicatorLight.writeSync(0);

function pumpOn(){
  pumpRelay.writeSync(1);
  pumpIndicatorLight.writeSync(1);
  console.log('water pump running');
}

function pumpOff(){
  pumpRelay.writeSync(0);
  pumpIndicatorLight.writeSync(0);
  console.log('water pump off');
}

function water(){
  const time = require('./clock.js');
  let currentTime = time();
  if(currentTime.minutes === 38){
    setTimeout(pumpOn, 30000);
  }
  pumpOff();
}

let lightTimer = setInterval(water, 1000);

function closePump(){
  pumpOff();
  pumpRelay.unexport();
  pumpIndicatorLight.unexport();
  clearTimeout(pumpOn);
  clearInterval(water);
}

process.on('SIGINT', closePump);

module.exports = water;