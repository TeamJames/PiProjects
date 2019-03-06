'use strict';

const Gpio = require('onoff').Gpio;
// let lightRelay = new Gpio(22, 'out');

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

    console.clear();
    console.log(state.greeting);
    console.log('The current time is: ', state.normalHours, ':', state.normalMinutes, ':', state.normalSeconds);
    if(state.vegStatus){
      console.log('Veg Room lights are on');
    }else{
      console.log('Flower Room lights are off');
    };
    if(state.flowerStatus){
      console.log('Flower Room lights are on');
    } else {
      console.log('Flower Room lights are off');
    };
    if(state.waterPumpStatus === true){
      console.log('Water Pump is running');
    };
    console.log('water pump start/stop times: ', state.waterPumpStartTime, state.waterPumpStopTime, '-=-=-=-');
    console.log('drain pump start/stop times: ', state.drainPumpStartTime, state.drainPumpStopTime);
  };

  let timeChecker = setInterval(checkTime, 1000);

  function shutdown() {
    console.log('shutting down');
    clearInterval(timeChecker);
    // lightRelay.unexport();
  };


  process.on('SIGINT', shutdown);
};

go();