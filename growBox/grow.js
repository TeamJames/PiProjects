'use strict';

const Gpio = require('onoff').Gpio;

const water = require('./water/water.js');
const test = require('../test/test.js');

const serverStatus = new Gpio(21, 'out');
const thirstyPlants = new Gpio(12, 'out');
const mockedWaterPump = new Gpio(20, 'out');
const mockedDrainValve = new Gpio(16, 'out');
const startButton = new Gpio(19, 'in', 'rising');
const mockedMoistureSensor = new Gpio(13, 'in', 'rising');
const stopButton = new Gpio(26, 'in', 'rising');

mockedMoistureSensor.watch(function(err, value){
    if(err){
        return console.error('There was an error', err);;
    };
    console.log('Plants are thirsty!');
    thirstyPlants.writeSync(1);
    water.waterStart();
});