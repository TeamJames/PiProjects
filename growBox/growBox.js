'use strict';

const Gpio = require('onoff').Gpio;
let flowerRoomRelay = new Gpio(22, 'out');
// let flowerRoomIndicator = new Gpio(XXXXXX, 'out');
// let vegRoomRelay = new Gpio(XXXXXX, 'out');
// let vegRoomIndicator = new Gpio(XXXXXX, 'out');
// let waterPumpRelay = new Gpio(XXXXXX, 'out');
// let waterPumpIndicator = new Gpio(XXXXXX, 'out');
// let drainPumpRelay = new Gpio(XXXXXX, 'out');
// let drainPumpIndicator = new Gpio(XXXXXX, 'out');
// let pumpButton = new Gpio(XXXXXX, 'in', 'falling');
// let drainButton = new Gpio(XXXXXX, 'in', 'falling');


function go(){

  let state = {
    vegStartTime: 5,
    vegStopTime: 23,
    flowerStartTime: 7,
    flowerStopTime: 20,
    waterPumpDuration: 10,
    drainPumpDuration: 6,
    greeting: '',
    normalHours: 0,
    normalMinutes: 0,
    normalSeconds: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    vegStatus: false,
    flowerStatus: false,
    waterPumpStartTime: {
      hours: 20,
      minutes: 17
    },
    waterPumpStopTime: {
      hours: 0,
      minutes: 0
    },
    waterPumpStatus: false,
    drainPumpStartTime: {
      hours: 0,
      minutes: 0
    },
    drainPumpStopTime: {
      hours: 0,
      minutes: 0
    }
  };
  
  state.waterPumpStopTime.hours = state.waterPumpStartTime.hours;
  state.waterPumpStopTime.minutes = state.waterPumpStartTime.minutes + state.waterPumpDuration;
  state.drainPumpStartTime.hours = state.waterPumpStartTime.hours;
  state.drainPumpStartTime.minutes = state.waterPumpStopTime.minutes + 1;
  state.drainPumpStopTime.hours = state.drainPumpStartTime.hours;
  state.drainPumpStopTime.minutes = state.drainPumpStartTime.minutes + state.drainPumpDuration;

  pumpButton.watch(function (err, value){
      if (err) {
        return console.log(err);
      };
      if (waterPumpStatus){
        return console.log('hey looks like the water pump is on');
      } else {
        return console.log('definitely looks like the pump is off');
      };
  
  function checkTime(){
    const time = require('./lights/clock.js');
    let currentTime = time();

    //  normalize time for display
    state.normalHours = currentTime.hours;
    if (currentTime.hours > 12) {
      state.normalHours -= 12;
    }
    state.normalMinutes = currentTime.minutes;
    if (currentTime.minutes < 10) {
      state.normalMinutes = '0' + currentTime.minutes.toString();
    }
    state.normalSeconds = currentTime.seconds;
    if (currentTime.seconds < 10) {
      state.normalSeconds = '0' + currentTime.seconds.toString();
    };

    //  set state to current numerical time
    state.hours = currentTime.hours;
    state.minutes = currentTime.minutes;
    state.seconds = currentTime.seconds;
    if(state.hours < 12){
      state.greeting = 'good morning';
    };
    if(state.hours < 17 && state.hours > 11){
      state.greeting = 'good afternoon';
    };
    if(state.hours > 17){
      state.greeting = 'good evening';
    };

    //  veg room lights
    if(state.hours > state.vegStartTime && state.hours < state.vegStopTime){
      state.vegStatus = true;
    } else {
      state.vegStatus = false;
    };

    //  flower room lights
    if(state.hours > state.flowerStartTime && state.hours < state.flowerStopTime){
      state.flowerStatus = true;
    } else {
      state.flowerStatus = false;
    };

    //  flower room water pump
    
    if(state.waterPumpStartTime.hours === state.hours && state.waterPumpStartTime.minutes === state.minutes){
      state.waterPumpStatus = true;
    };
    if(state.waterPumpStopTime.minutes === state.minutes){
      state.waterPumpStatus = false;
    };

    //  flower room drain pump

    if(state.drainPumpStartTime.hours === state.hours && state.drainPumpStartTime.minutes === state.minutes){
      state.drainPumpStatus = true;
    };
    if(state.drainPumpStopTime.minutes === state.minutes){
      state.drainPumpStatus = false;
    };

    console.clear();
    console.log(state.greeting);
    console.log('The current time is: ', state.normalHours, ':', state.normalMinutes, ':', state.normalSeconds);
    if(state.vegStatus){
      vegRoomRelay.writeSync(1);
      vegRoomIndicator.writeSync(1);
      console.log('Veg Room lights are on');
    }else{
      console.log('Flower Room lights are off');
      vegRoomRelay.writeSync(0);
      vegRoomIndicator.writeSync(0);
    };
    if(state.flowerStatus){
      flowerRoomRelay.writeSync(1);
      flowerRoomIndicator.writeSync(1);
      console.log('Flower Room lights are on');
    } else {
      flowerRoomRelay.writeSync(0);
      flowerRoomIndicator.writeSync(0);
      console.log('Flower Room lights are off');
    };
    if(state.waterPumpStatus === true){
      waterPumpRelay.writeSync(1);
      waterPumpIndicator.writeSync(1);
      console.log('Water Pump is running');
    }else{
      waterPumpRelay.writeSync(0);
      waterPumpIndicator.writeSync(0);
    };
  };

  let timeChecker = setInterval(checkTime, 1000);

  function shutdown() {
    console.log('shutting down');
    clearInterval(timeChecker);
    flowerRoomRelay.writeSync(1);
    flowerRoomRelay.unexport();
  };


  process.on('SIGINT', shutdown);
};

go();