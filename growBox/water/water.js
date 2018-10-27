'use strict';

// const Gpio = require('onoff').Gpio;

// const test = require('../test/test.js');

// const serverStatus = new Gpio(21, 'out');
// const thirstyPlants = new Gpio(12, 'out');
// const mockedWaterPump = new Gpio(20, 'out');
// const mockedDrainValve = new Gpio(16, 'out');
// const startButton = new Gpio(19, 'in', 'rising');
// const mockedMoistureSensor = new Gpio(13, 'in', 'rising');
// const stopButton = new Gpio(26, 'in', 'rising');


console.log('growBox started on port 420');
test();

mockedMoistureSensor.watch(function(err, value){
    if(err){
        return console.error('There was an error', err);;
    };
    console.log('Plants are thirsty!');
    thirstyPlants.writeSync(1);
    setTimeout(waterStart, 2000)
});

function waterStart(callback) {
    console.log('water pump on');
    mockedWaterPump.writeSync(1);
    setTimeout(waterStop, 5000);
};

const waterStop = function(){
    console.log('water pump off');
    mockedWaterPump.writeSync(0);
};

const startDrainingWaste = function(){
    console.log('opening drain valve');
    mockedDrainValve.writeSync(1);
    const stopDrainingWaste = function(){
      console.log('closing drain valve');
      mockedDrainValve.writeSync(0);
    };
    setTimeout(stopDrainingWaste, 3000);
};



function shutDown() {
    thirstyPlants.writeSync(0);
    mockedWaterPump.writeSync(0);
    mockedDrainValve.writeSync(0);
    console.log('growBox ready');
};

const unexportOnClose = function(){
    thirstyPlants.writeSync(0);
    mockedWaterPump.writeSync(0);
    thirstyPlants.unexport();
    mockedWaterPump.unexport();
    mockedMoistureSensor.unexport();
    console.log('growbox shut down');
};

process.on('SIGINT', unexportOnClose);