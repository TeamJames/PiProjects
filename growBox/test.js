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
      minutes: 30
    },
    flowerStopTime: {
      hours: 18,
      minutes: 0
    },
    waterPumpDuration: 10,
    drainPumpDuration: 5,
    greeting: '',
    waterPumpMessage: '',
    drainPumpMessage: '',
    manualWaterPumpMessage: '',
    manualDrainPumpMessage: '',
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
    manualWaterPumpStatus: false,
    waterPumpStartTime: {
      hours: 0,
      minutes: 0
    },
    waterPumpStopTime: {
      hours: 0,
      minutes: 0
    },
    manualWaterPumpStartTime: {
      hours: 0,
      minutes: 0
    },
    manualWaterPumpStopTime: {
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
    },
    manualDrainPumpStartTime: {
      hours: 0,
      minutes: 0
    },
    manualDrainPumpStopTime: {
      hours: 0,
      minutes: 0
    }
  };

//  set timers relative to each other

  state.waterPumpStartTime.hours = state.flowerStartTime.hours;
  state.waterPumpStartTime.minutes = state.flowerStartTime.minutes;
  state.waterPumpStopTime.hours = state.waterPumpStartTime.hours;
  state.waterPumpStopTime.minutes = state.waterPumpStartTime.minutes + state.waterPumpDuration;
  if(state.waterPumpStopTime.minutes > 59){
    state.waterPumpStopTime.hours +=1;
    state.waterPumpStopTime.minutes -=60;
  };
  state.drainPumpStartTime.hours = state.waterPumpStopTime.hours;
  state.drainPumpStartTime.minutes = state.waterPumpStopTime.minutes + 1;
  if(state.drainPumpStartTime.minutes > 59){
    state.drainPumpStartTime.hours +=1;
    state.drainPumpStartTime.minutes -=60;
  };
  state.drainPumpStopTime.hours = state.drainPumpStartTime.hours;
  state.drainPumpStopTime.minutes = state.drainPumpStartTime.minutes + state.drainPumpDuration;
  if(state.drainPumpStopTime.minutes > 59){
      state.drainPumpStopTime.hours +=1;
      state.drainPumpStopTime.minutes -=60;
  };
  

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
    if (state.waterPumpStopTime.hours === state.hours && state.waterPumpStopTime.minutes === state.minutes) {
      state.waterPumpStatus = false;
    };

    //  flower room drain pump

    if (state.drainPumpStartTime.hours === state.hours && state.drainPumpStartTime.minutes === state.minutes) {
      state.drainPumpStatus = true;
    };
    if (state.drainPumpStopTime.hours === state.hours && state.drainPumpStopTime.minutes === state.minutes) {
      state.drainPumpStatus = false;
    };


    status();
  };



//  Button Handlers


    pumpButton.watch(function (err) {
      if(err){return console.log(err);}
      if(state.waterPumpStatus === true){return console.log('Error:  Water pump already running!');};
      if(state.manualWaterPumpStatus === false){
        state.manualWaterPumpStatus = true;
        state.manualWaterPumpStartTime.hours = state.hours;
        state.manualWaterPumpStartTime.minutes = state.minutes;
        state.manualWaterPumpStopTime.hours = state.hours;
        state.manualWaterPumpStopTime.minutes = state.minutes + drainPumpDuration;
        if(state.manualWaterPumpStopTime.minutes > 59){
          state.manualWaterPumpStopTime.minutes -= 60;
          state.manualWaterPumpStopTime.hours += 1;
        };
        state.manualWaterPumpMessage = 'Manual Water Pump:  ON';
      } else {
        state.waterPumpStatus = false;
        state.manualWaterPumpMessage = '';
      };
    });

  
    drainButton.watch(function (err) {
      if(err){return console.log(err);}
      if(state.drainPumpStatus === true){return console.log('Error:  Drain pump already running!');};
      if(state.manualDrainPumpStatus === false){
        state.manualDrainPumpStatus = true;
        state.manualDrainPumpStartTime.hours = state.hours;
        state.manualDrainPumpStartTime.minutes = state.minutes;
        state.manualDrainPumpStopTime.hours = state.hours;
        state.manualDrainPumpStopTime.minutes = state.minutes;
        if(state.manualDrainPumpStopTime.minutes > 59){
          state.manualDrainPumpStopTime.hours += 1;
          state.manualDrainPumpStopTime.minutes -= 60;
        };
        state.manualDrainPumpMessage = 'Manual Drain Pump:  ON';
      } else {
        state.manualDrainPumpStatus = false;
        state.manualDrainPumpMessage = '';
      };
    });


//  Display status to console, adjust state of GPIO pins to match application state


  function status() {
    console.clear();
    console.log(state.greeting);
    console.log('The current time is: ', state.normalHours, ':', state.normalMinutes, ':', state.normalSeconds);
    console.log('cycle complete at: ', state.drainPumpStopTime.hours, ':', state.drainPumpStopTime.minutes);
    console.log(state.testMessage);
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
      state.waterPumpMessage = 'Water Pump Start Time: ' + state.waterPumpStartTime.hours + ':' + state.waterPumpStartTime.minutes + '    Water Pump Stop Time: ' + state.waterPumpStopTime.hours + ':' + state.waterPumpStopTime.minutes;
    } else {
      waterPumpRelay.writeSync(1);
      state.waterPumpMessage = 'Water pump is off';
      waterPumpIndicator.writeSync(0);
    };
    if(state.manualWaterPumpStatus === true){
      waterPumpRelay.writeSync(0);
      waterPumpIndicator.writeSync(1);
      state.manualWaterPumpMessage = 'Manual Water Pump Start Time: ' + state.manualWaterPumpStartTime.hours + ':' + state.manualWaterPumpStartTime.minutes + '      Manual Water Pump Stop Time: ' + state.manualWaterPumpStopTime.hours + ':' + state.manualWaterPumpStopTime.minutes;
    } else {
      manualWaterPumpRelay.writeSync(1);
      state.manualWaterPumpMessage = '';
      waterPumpIndicator.writeSync(0);
    };
    if(state.drainPumpStatus === true) {
      drainPumpRelay.writeSync(0);
      drainPumpIndicator.writeSync(1);
      state.drainPumpMessage = 'Drain Pump Start Time: ' + state.drainPumpStartTime.hours + ':' + state.drainPumpStartTime.minutes + '    Drain Pump Stop Time: ' + state.drainPumpStopTime.hours + ':' + state.drainPumpStopTime.minutes;
    } else {
      drainPumpRelay.writeSync(1);
      drainPumpIndicator.writeSync(0);
      state.drainPumpMessage = 'Drain pump is off';
    };
    if(state.manualDrainPumpStatus === true){
      drainPumpRelay.writeSync(0);
      drainPumpIndicator.writesync(1);
      state.manualDrainPumpMessage = 'Manual Drain Pump Start Time: ' + state.manualDrainPumpStartTime.hours + ':' + state.manualDrainPumpStartTime.minutes + '      Manual Drain Pump Stop Time: ' + state.manualDrainPumpStopTime.hours + ':' + state.manualDrainPumpStopTime.minutes;
    }else{
      drainPumpRelay.writeSync(1);
      drainPumpIndicator.writeSync(0);
      state.manualDrainPumpMessage = '';
    };
    
    console.log(state.waterPumpMessage);
    console.log(state.drainPumpMessage);
    if(state.manualDrainPumpMessage.length > 1){
      console.log(state.manualWaterPumpMessage);
    };
    if(state.manualDrainPumpMessage.length > 1){
      console.log(state.manualDrainPumpMessage);
    };
    
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