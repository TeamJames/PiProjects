'use strict';

const Gpio = require('onoff').Gpio;

let lightRelay = new Gpio(22, 'out');
// let lightTestRelay = new Gpio(20, 'out');

lightRelay.writeSync(0);
// lightTestRelay.writeSync(0);

function lights(){

function lightsOn(){
  lightRelay.writeSync(1);
  // lightTestRelay.writeSync(1);
  // console.log('lights are on');
};

function lightsOff(){
  lightRelay.writeSync(0);
  // lightTestRelay.writeSync(0);
};

function checkLights(){
  const time = require('./clock.js');
  let currentTime = time();
  if(currentTime.hours >= 2 && currentTime.hours < 12){
    // console.log('good morning');
    console.clear();
    console.log('Welcome to the Pot Roaster 3000');
    console.log('the current time is: ', currentTime.hours, ':', currentTime.minutes, ':', currentTime.seconds);
    console.log('Roast should be done in time for football (~10AM)');
    lightsOn();
  };
  if(currentTime.hours >= 12 || currentTime.hours < 2){
    console.clear();
    console.log('Welcome to the Pot Roaster 3000');
    console.log('the current time is: ', currentTime.hours, ':', currentTime.minutes, ':', currentTime.seconds);
    // console.log('good night');
    console.log('Roast is still marinating');
    // lightsOff();
  };
  // if(currentTime.hours < 8){
  //   console.log('good morning');
  //   console.log('the current time is: ', currentTime.hours, ':', currentTime.minutes, ':', currentTime.seconds);
  //   console.log('lights are still off');
  //   lightsOff();
  // }
};

function closeLights(){
  console.log('shutting down');
  lightRelay.writeSync(0);
  // lightTestRelay.writeSync(0);
  lightRelay.unexport();
  // lightTestRelay.unexport();
  clearInterval(lightTimer)
};

let lightTimer = setInterval(checkLights, 1000);

process.on('SIGINT', closeLights);

};

module.exports = lights;
