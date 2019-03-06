'use strict';

function go(){

  let state = {
    greeting: 'things',
    waterPumpDuration: 10,
    drainPumpDuration: 6,
    normalHours: 0,
    normalMinutes: 0,
    normalSeconds: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    vegStartTime: 5,
    vegStopTime: 23,
    vegStatus: 'Go fuck yourself',
    flowerStartTime: 7,
    flowerStopTime: 19,
    flowerStatus: 'Go fuck yourself',
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
      state.vegStatus = 'Veg Room lights are on';
    } else {
      state.vegStatus = 'Veg Room lights are off';
    };

    //  flower room lights
    if(state.hours > state.flowerStartTime && state.hours < state.flowerStopTime){
      state.flowerStatus = 'Flower Room lights are on';
    } else {
      state.flowerStatus = 'Flower Room lights are off';
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
    console.log('Veg Room Status: ', state.vegStatus);
    console.log('Flower Room Status: ', state.flowerStatus);
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
  };


  process.on('SIGINT', shutdown);
};

go();