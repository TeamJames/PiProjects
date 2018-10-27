'use strict';

const Gpio = require('onoff').Gpio;

const thirstyPlants = new Gpio(12, 'out');
const waterPumpLED = new Gpio(20, 'out');
const drainValveLED = new Gpio(16, 'out');
const mockedStatus = new Gpio(21, 'out');


const mockedWaterPump = new Gpio(5, 'in', 'rising');
const mockedDrainValve = new Gpio(26, 'in', 'rising');
const startButton = new Gpio(19, 'in', 'rising');
const mockedMoistureSensor = new Gpio(13, 'in', 'rising');

let reservoir = 0;

startButton.watch(function(err){
    if(err){
        return console.error(err);
    }
    mockedStatus.writeSync(1);
    console.log('growBox started on port 420');
    status();
});

mockedMoistureSensor.watch(function(err){
    if(err){
        return console.error('There was an error', err);;
    };
    console.log('Plants are thirsty!');
    thirstyPlants.writeSync(1);
    // setTimeout(waterStart, 2000);
});

mockedWaterPump.watch(function(err){
    if(err){
        return console.error(err);
    }
    waterStart();
});

mockedDrainValve.watch(function(err){
    if(err){
        return console.error(err);
    }
    drainWaste();
});

function waterStart() {
    console.log('water pump on');
    waterPumpLED.writeSync(1);
    setTimeout(waterStop, 2000);
};

function waterStop(){
    console.log('water pump off');
    thirstyPlants.writeSync(0);
    console.log('plants are well hydrated');
    waterPumpLED.writeSync(0);
    reservoir +=1;
    if(reservoir === 10){
        return drainWaste();
    };
    status();
};

function drainWaste(){
    console.log('opening drain valve');
    drainValveLED.writeSync(1);
    setTimeout(closeWasteValve, 5000);
};

function closeWasteValve(){
    console.log('closing drain valve');
    drainValveLED.writeSync(0);
    status();
};

function status(){
    if(mockedWaterPump.readSync() === 1){
        console.log('water pump is running');
    } else {
        console.log('water pump is off');
    }
    if(mockedDrainValve.readSync()=== 1){
        console.log('drain valve is open');
    } else {
        console.log('drain valve is closed');
    }
    if(thirstyPlants.readSync() === 1){
        console.log('plants are thirsty');
    } else {
        console.log('plants are well hydrated');
    }
    if(mockedStatus.readSync() === 1){
        console.log('system ready');
    }
    console.log('Waste Resevoir is ', reservoir, '/10 full');
};

const unexportOnClose = function(){
    thirstyPlants.writeSync(0);
    thirstyPlants.unexport();
    waterPumpLED.writeSync(0);
    waterPumpLED.unexport();
    drainValveLED.writeSync(0);
    drainValveLED.unexport();
    mockedStatus.writeSync(0);
    mockedStatus.unexport();
    mockedWaterPump.unexport();
    mockedDrainValve.unexport();
    startButton.unexport();
    mockedMoistureSensor.unexport();
    console.log('growbox shut down');
};

process.on('SIGINT', unexportOnClose);