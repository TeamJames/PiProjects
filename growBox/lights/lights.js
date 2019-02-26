'use strict';


const Gpio = require('onoff').Gpio;

let lightRelay = new Gpio(22, 'out');
// let lightIndicatorLight = new Gpio(13, 'out');
// let pumpRelay = new Gpio(24, 'out');
let waterPump = new Gpio(15, 'out');
let drainPump = new Gpio(12, 'out');
let pumpButton = new Gpio(17, 'in', 'falling');
let drainButton = new Gpio(7, 'in', 'falling');
waterPump.writeSync(1);
drainPump.writeSync(1);
lightRelay.writeSync(0);
// lightIndicatorLight.writeSync(0);
// drainPumpIndicatorLight.writeSync(0);


function runShit() {
    pumpButton.watch(function (err, value){
      if (err) {
        console.log(err);
        return;
      };
      if (waterPump.readSync() === 0){
        console.log('pumpoff');
        return pumpOff();        
      };
      if(waterPump.readSync() === 1){
        console.log('pumpon');
        return pumpOn();
      };

    });
    drainButton.watch(function (err, value){
      if (err) {
        console.log(err);
        return;
        if(drainPump.readSync() === 0){
          console.log('drain off');
          return drainOff();
        };
        if(drainPump.readSync() === 1){
          console.log('drain on');
          return drainOn();
        };
      };
    });

  function lightsOn() {
    lightRelay.writeSync(1);
    // lightIndicatorLight.writeSync(1);
  };

  function lightsOff() {
    lightRelay.writeSync(0);
    // lightIndicatorLight.writeSync(0);
  };

  function pumpOn() {
    waterPump.writeSync(0);
  };

  function pumpOff() {
    waterPump.writeSync(1);
  };

  function drainOn() {
    drainPump.writeSync(0);
  };
  
  function drainOff() {
    drainPump.writeSync(1);
  };

  function checkLights() {
    console.clear();
    const time = require('./clock.js');
    let currentTime = time();
    let startTime = 7;
    let stopTime = 23;
    let waterTime = 48;
    let normalHours = currentTime.hours;

    //  normalize time for display
    if (currentTime.hours > 12) {
      normalHours -= 12;
    }
    let normalMinutes = currentTime.minutes;
    if (currentTime.minutes < 10) {
      normalMinutes = '0' + currentTime.minutes.toString();
    }
    let normalSeconds = currentTime.seconds;
    if (currentTime.seconds < 10) {
      normalSeconds = '0' + currentTime.seconds.toString();
    };


    //  light timer
    if (currentTime.hours < 12) {
      console.log('good morning');
    } else if (currentTime.hours > 12 && currentTime.hours < 18) {
      console.log('good afternoon');
    } else {
      console.log('good evening');
    }
    console.log('the current time is: ', normalHours, ':', normalMinutes, ':', normalSeconds);

    if (lightRelay.readSync() === 0) {
      console.log('lights are off');
    } else {
      console.log('lights are on');
    }
    if (currentTime.hours >= startTime && currentTime.seconds === 0 && currentTime.hours < stopTime) {
      lightsOn();
    };
    if (currentTime.hours >= stopTime && currentTime.seconds === 0) {
      lightsOff();
    };
    if (currentTime.hours < startTime) {
      console.log('lights are still off');
    }


    ///  pump timer

  //   if (currentTime.minutes === 61) {
  //     console.log('water pump running');
  //     pumpOn();
  //   } else {
  //     console.log('water pump off');
  //     pumpOff();
  //   };
  };




  function shutdown() {
    console.log('shutting down');

    pumpOff();
    lightsOff();
    // pumpRelay.unexport();
    pumpIndicatorLight.unexport();
    lightRelay.unexport();
    // lightIndicatorLight.unexport();
    // drainPumpIndicatorLight.unexport();
    pumpButton.unexport();
    clearInterval(lightTimer);
  };

  let lightTimer = setInterval(checkLights, 1000);

  process.on('SIGINT', shutdown);

};

module.exports = runShit;
