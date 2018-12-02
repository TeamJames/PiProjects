'use strict';


const Gpio = require('onoff').Gpio;

let lightRelay = new Gpio(22, 'out');
let lightIndicatorLight = new Gpio(16, 'out');
let pumpRelay = new Gpio(21, 'out');
let pumpIndicatorLight = new Gpio(17, 'out');

pumpRelay.writeSync(0);
pumpIndicatorLight.writeSync(0);
lightRelay.writeSync(0);
lightIndicatorLight.writeSync(0);

function runShit(){

function lightsOn(){
  lightRelay.writeSync(1);
  lightIndicatorLight.writeSync(1);
};

function lightsOff(){
  lightRelay.writeSync(0);
  lightIndicatorLight.writeSync(0);
};

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

function checkLights(){
  console.clear();
  const time = require('./clock.js');
  let currentTime = time();
  let startTime = 7;
  let stopTime = 23;
  let waterTime = 55;
  let normalHours = currentTime.hours;

  //  normalize time for display
  if(currentTime.hours > 12){
    normalHours -= 12;
  }
  let normalMinutes = currentTime.minutes;
  if(currentTime.minutes < 10){
    normalMinutes = '0' + currentTime.minutes.toString();
  }
  let normalSeconds = currentTime.seconds;
  if(currentTime.seconds < 10){
    normalSeconds = '0' + currentTime.seconds.toString();
  };
  

  //  light timer
  if(currentTime.hours < 12){
    console.log('good morning');
  } else if (currentTime.hours > 12 && currentTime.hours < 18) {
    console.log('good afternoon');
  } else {
    console.log('good evening');
  }
  console.log('the current time is: ', normalHours, ':', normalMinutes, ':', normalSeconds);

  if(lightRelay.readSync() === 0){
    console.log('lights are off');
  } else {
    console.log('lights are on');
  }
  if(currentTime.hours >= startTime && currentTime.seconds === 0 && currentTime.hours < stopTime){
    lightsOn();
  };
  if(currentTime.hours >= stopTime && currentTime.seconds === 0){
    lightsOff();
  };
  if(currentTime.hours < startTime){
    console.log('lights are still off');
  }
  

  ///  pump timer

  if(currentTime.minutes === waterTime){
    pumpOn();
    setTimeout(pumpOff, 30000);
  };
};



function shutdown(){
  console.log('shutting down');
  pumpOff();
  lightsOff();
  pumpRelay.unexport();
  pumpIndicatorLight.unexport();
  lightRelay.unexport();
  lightIndicatorLight.unexport();
  clearInterval(lightTimer)
};

let lightTimer = setInterval(runShit, 1000);

process.on('SIGINT', shutdown);

};

module.exports = runShit;
