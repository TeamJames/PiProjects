'use strict';

const Gpio = require('onoff').Gpio;

let time1 = new Date();
let startUpTime = time1.getHours();

let lights = new Gpio(13, 'out');

function checkLights() {
  console.log('checking lights');
  lightTimer();
  setTimeout(checkLights, 20000);
};

function lightTimer() {
  let startTime = 8;
  let stopTime = 22;
  let time2 = new Date();
  let checkTime = time2.getHours();
  console.log(startTime, stopTime, checkTime);
  if (checkTime >= startTime && checkTime <= stopTime) {
    console.log('lights should be on');
    let timeCheck = new Date();
    console.log('turning lights on at:   ', timeCheck);
    
    lights.writeSync(1);
  };
  if (checkTime < startTime || checkTime > stopTime) {
    let timeCheck2 = new Date();
    console.log('turning lights off at:    ', timeCheck2);
    console.log('system hours:    ', checkTime);
    
    lights.writeSync(0);
  };

};


checkLights();