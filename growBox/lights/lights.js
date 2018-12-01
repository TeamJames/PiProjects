'use strict';

const Gpio = require('onoff').Gpio;

let lightRelay = new Gpio(22, 'out');
let lightTestRelay = new Gpio(16, 'out');

lightRelay.writeSync(0);
lightTestRelay.writeSync(0);

function lights(){

function lightsOn(){
  lightRelay.writeSync(1);
  lightTestRelay.writeSync(1);
  console.log('lights are on');
};

function lightsOff(){
  lightRelay.writeSync(0);
  lightTestRelay.writeSync(0);
  console.log('lights are off');
};

function checkLights(){
  const time = require('./clock.js');
  let currentTime = time();
  let startTime = 7;
  let stopTime = 23;
  let civilianHours = currentTime.hours;
  if(currentTime.hours > 12){
    civilianHours -= 12;
  }
  let normalMinutes = currentTime.minutes;
  if(currentTime.minutes < 10){
    normalMinutes = '0' + currentTime.minutes.toString();
  }
  console.clear();
  
  if(lightRelay.readSync() === 0){
    console.log('lights are off');
  } else {
    console.log('lights are on');
  }
  if(currentTime.hours < 12){
    console.log('good morning');
  } else if (currentTime.hours > 12 && currentTime.hours < 18) {
    console.log('good afternoon');
  } else {
    console.log('good evening');
  }
  console.log('the current time is: ', civilianHours, ':', normalMinutes, ':', currentTime.seconds);

  if(currentTime.hours >= startTime && currentTime.seconds === 0 && currentTime.hours < stopTime){
    console.clear();
    lightsOn();
  };
  if(currentTime.hours >= stopTime && currentTime.seconds === 0){
    console.clear();
    lightsOff();
  };
  if(currentTime.hours < startTime){
    console.log('lights are still off');
  }
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
