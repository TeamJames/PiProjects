'use strict';

function lights(){

function lightsOn(){
  console.log('writesync(1)');
};

function lightsOff(){
  console.log('writesync(0)');
};

function checkLights(){
  const time = require('./clock.js');
  let currentTime = time();
  console.log('the current time is: ', currentTime.hours, ':', currentTime.minutes, ':', currentTime.seconds);
  if(currentTime.seconds > 30){
    console.log('good evening');
    
    lightsOff();
  };
  if(currentTime.seconds < 30){
    console.log('good morning');
    
    lightsOn();
  };
  if(currentTime.seconds === 30){
    console.log('lunchtime!');
    
  };
};

function closeLights(){
  console.log('shutting down');
  clearInterval(lightTimer)
};

let lightTimer = setInterval(checkLights, 1000);

process.on('SIGINT', closeLights);

};

module.exports = lights;
