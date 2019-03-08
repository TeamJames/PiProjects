'use strict';

const Gpio = require('onoff').Gpio;
let flowerRoomRelay = new Gpio(22, 'out');
// let flowerRoomIndicator = new Gpio(XXXXXX, 'out');
// let vegRoomRelay = new Gpio(XXXXXX, 'out');
// let vegRoomIndicator = new Gpio(XXXXXX, 'out');
let waterPumpRelay = new Gpio(15, 'out');
let waterPumpIndicator = new Gpio(20, 'out');
let drainPumpRelay = new Gpio(12, 'out');
let drainPumpIndicator = new Gpio(21, 'out');
let pumpButton = new Gpio(17, 'in', 'falling', {
  debounceTimeout: 25
});
let drainButton = new Gpio(26, 'in', 'falling', {
  debounceTimeout: 25
});



function go() {
  let state = {
    vegStartTime: 5,
    vegStopTime: 23,
    flowerStartTime: {
      hours: 16,
      minutes: 0
    },
    flowerStopTime: {
      hours: 16,
      minutes: 45
    },
    waterPumpDuration: 10,
    drainPumpDuration: 5,
    greeting: '',
    waterPumpMessage: '',
    drainPumpMessage: '',
    testMessage: '',
    normalHours: 0,
    normalMinutes: 0,
    normalSeconds: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    vegStatus: false,
    flowerStatus: false,
    waterPumpStatus: false,
    drainPumpStatus: false,
    waterPumpStartTime: {
      hours: 0,
      minutes: 0
    },
    waterPumpStopTime: {
      hours: 0,
      minutes: 0
    },
    drainPumpStartTime: {
      hours: 0,
      minutes: 0
    },
    drainPumpStopTime: {
      hours: 0,
      minutes: 0
    }
  };

//  set timers relative to each other

  state.waterPumpStartTime.hours = state.flowerStartTime.hours;
  state.waterPumpStartTime.minutes = state.flowerStartTime.minutes;
  state.waterPumpStopTime.hours = state.waterPumpStartTime.hours;
  state.waterPumpStopTime.minutes = state.waterPumpStartTime.minutes + state.waterPumpDuration;
  state.drainPumpStartTime.hours = state.waterPumpStartTime.hours;
  state.drainPumpStartTime.minutes = state.waterPumpStopTime.minutes + 1;
  state.drainPumpStopTime.hours = state.drainPumpStartTime.hours;
  state.drainPumpStopTime.minutes = state.drainPumpStartTime.minutes + state.drainPumpDuration;




  function checkTime() {
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
    if (state.hours < 12) {
      state.greeting = 'good morning';
    };
    if (state.hours < 17 && state.hours > 11) {
      state.greeting = 'good afternoon';
    };
    if (state.hours > 17) {
      state.greeting = 'good evening';
    };

    //  veg room lights
    if (state.hours > state.vegStartTime && state.hours < state.vegStopTime) {
      state.vegStatus = true;
    } else {
      state.vegStatus = false;
    };

    //  flower room lights
    if (state.hours >= state.flowerStartTime.hours && state.hours <= state.flowerStopTime.hours && state.minutes >= state.flowerStartTime.minutes && state.minutes < state.flowerStopTime.minutes) {
      state.flowerStatus = true;
    } else {
      state.flowerStatus = false;
    };

    //  flower room water pump

    if (state.waterPumpStartTime.hours === state.hours && state.waterPumpStartTime.minutes === state.minutes) {
      state.waterPumpStatus = true;
    };
    if (state.waterPumpStopTime.minutes === state.minutes) {
      state.waterPumpStatus = false;
    };

    //  flower room drain pump

    if (state.drainPumpStartTime.hours === state.hours && state.drainPumpStartTime.minutes === state.minutes) {
      state.drainPumpStatus = true;
    };
    if (state.drainPumpStopTime.minutes === state.minutes) {
      state.drainPumpStatus = false;
    };


    status();
  };



//  Button Handlers


    pumpButton.watch(function (err) {
      if(err){return console.log(err);}
      if(state.waterPumpStatus === false){
        state.waterPumpStatus = true;
        state.waterPumpStopTime.hours = state.hours;
        state.waterPumpStopTime.minutes = state.minutes + state.waterPumpDuration;


        //  THIS WILL NEED TO BE NORMALIZED FOR ROLLOVER AT 60 MINUTES


        // state.testMessage = 'state.waterPumpStopTime' + state.waterPumpStopTime;
      } else {
        state.waterPumpStatus = false;
      };
    });

  
    drainButton.watch(function (err) {
      if(err){return console.log(err);}
      if(state.drainPumpStatus === false){
        state.drainPumpStatus = true;
        state.testMessage = 'state.drainPumpStopTime: ' + state.drainPumpStopTime.hours + ':' + state.drainPumpStopTime.minutes;
        state.drainPumpStopTime.minutes = state.minutes + state.drainPumpDuration;

        //  THIS WILL NEED TO BE NORMALIZED FOR ROLLOVER AT 60 MINUTES


      } else {
        state.drainPumpStatus = false;
      };
    });


//  Display status to console, adjust state of GPIO pins to match application state


  function status() {
    console.clear();
    console.log(state.greeting);
    console.log(state.testMessage);
    console.log('The current time is: ', state.normalHours, ':', state.normalMinutes, ':', state.normalSeconds);
    if (state.vegStatus) {
      // vegRoomRelay.writeSync(1);
      // vegRoomIndicator.writeSync(1);
      console.log('Veg Room lights are on');
    } else {
      console.log('Flower Room lights are off');
      // vegRoomRelay.writeSync(0);
      // vegRoomIndicator.writeSync(0);
    };
    if (state.flowerStatus) {
      flowerRoomRelay.writeSync(1);
      // flowerRoomIndicator.writeSync(1);
      console.log('Flower Room lights are on');
    } else {
      flowerRoomRelay.writeSync(0);
      // flowerRoomIndicator.writeSync(0);
      console.log('Flower Room lights are off');
    };
    if (state.waterPumpStatus === true) {
      waterPumpRelay.writeSync(0);
      waterPumpIndicator.writeSync(1);
      let pumpTimeLeft = state.waterPumpStopTime.minutes - state.minutes;
      state.waterPumpMessage = 'Water pump is running for ' + pumpTimeLeft + ' minutes';
    } else {
      waterPumpRelay.writeSync(1);
      state.waterPumpMessage = 'Water pump is off';
      waterPumpIndicator.writeSync(0);
    };
    if(state.drainPumpStatus === true) {
      drainPumpRelay.writeSync(0);
      drainPumpIndicator.writeSync(1);
      let drainTimeLeft = state.drainPumpStopTime.minutes - state.minutes;
      state.drainPumpMessage = 'Drain pump is running for ' + drainTimeLeft + ' minutes';
    } else {
      drainPumpRelay.writeSync(1);
      drainPumpIndicator.writeSync(0);
      state.drainPumpMessage = 'Drain pump is off';
    };
    
    console.log(state.waterPumpMessage);
    console.log(state.drainPumpMessage);

  };

  let timeChecker = setInterval(checkTime, 1000);

  function shutDown() {
    console.log('shutting down');
    clearInterval(timeChecker);
    flowerRoomRelay.writeSync(0);
    flowerRoomRelay.unexport();
    waterPumpRelay.writeSync(1);
    waterPumpRelay.unexport();
    waterPumpIndicator.writeSync(0);
    waterPumpIndicator.unexport();
    drainPumpRelay.writeSync(1);
    drainPumpRelay.unexport();
    drainPumpIndicator.writeSync(0);
    drainPumpIndicator.unexport();
    pumpButton.unexport();
    drainButton.unexport();
  };

  process.on('SIGINT', shutDown);

};

go();