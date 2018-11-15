'use strict';

const Gpio = require('onoff').Gpio;

let lightRelay = new Gpio(22, 'out');
let lightTestRelay = new Gpio(20, 'out');

lightRelay.writeSync(0);
lightTestRelay.writeSync(0);

function lights(){

function lightsOn(){
  console.log('lights on');
  lightRelay.writeSync(1);
  lightTestRelay.writeSync(1);
};

function lightsOff(){
  console.log('lights off');
  lightRelay.writeSync(0);
  lightTestRelay.writeSync(0);
};

function checkLights(){
  const time = require('./clock.js');
  let currentTime = time();
  if(currentTime.hours >= 22 && currentTime.minutes >= 40 && currentTime.seconds === 01){
    console.log('good morning');
    console.log('the current time is: ', currentTime.days, ',   ', currentTime.hours, ':', currentTime.minutes, ':', currentTime.seconds);
    lightsOn();
  };
  if(currentTime.hours >= 22 && currentTime.minutes >= 45 && currentTime.seconds === 01){
    console.log('the current time is: ', currentTime.days, ',   ', currentTime.hours, ':', currentTime.minutes, ':', currentTime.seconds);
    console.log('good night');
    lightsOff();
  };
};

function closeLights(){
  console.log('shutting down');
  lightRelay.writeSync(0);
  lightTestRelay.writeSync(0);
  lightRelay.unexport();
  lightTestRelay.unexport();
  clearInterval(lightTimer)
};

let lightTimer = setInterval(checkLights, 1000);

process.on('SIGINT', closeLights);

};

module.exports = lights;
