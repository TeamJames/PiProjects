'use strict';

const Gpio = require('onoff').Gpio;

const water = require('./water/water.js');
const cheech = new Water;

const serverStatus = new Gpio(21, 'out');
const thirstyPlants = new Gpio(12, 'out');
const mockedWaterPump = new Gpio(20, 'out');
const mockedDrainValve = new Gpio(16, 'out');

const startButton = new Gpio(19, 'in', 'rising');
const mockedMoistureSensor = new Gpio(5, 'in', 'rising');
const mockedDrainValveRelay = new Gpio(13, 'in', 'rising');
const stopButton = new Gpio(26, 'in', 'rising');

startButton.watch(function(err, value){
  if(err){
    return console.error(err);
  }
  water.reset();
  serverStatus.writeSync(1);
});

mockedMoistureSensor.watch(function(err, value){
    if(err){
        return console.error(err);
    }
    console.log('Plants are thirsty!');
    thirstyPlants.writeSync(1);
    water.waterStart();
});

mockedDrainValveRelay.watch(function(err, value){
  if(err){
    return console.error(err);
  }
  console.log('Drain valve sensor indicates waste reservoir is full');
  startDrainingWaste();
});

stopButton.watch(function(err, value){
  if(err){
    return console.error(err);
  }
  console.log('Shutting down growBox');
  unexportOnClose();
});

const unexportOnClose = function(){
    thirstyPlants.writeSync(0);
    mockedWaterPump.writeSync(0);
    mockedDrainValve.writeSync(0);
    serverStatus.writeSync(0);
    serverStatus.writesync(0);
    thirstyPlants.unexport();
    mockedWaterPump.unexport();
    mockedDrainValve.unexport();
    mockedMoistureSensor.unexport();
    startButton.unexport();
    stopButton.unexport();
    mockedDrainValveRelay.unexport();
    console.log('growbox shut down');
};

process.on('SIGINT', unexportOnClose);
