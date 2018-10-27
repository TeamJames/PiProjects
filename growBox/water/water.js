//  use button to simulate thirstyGirl event

'use strict';

const Gpio = require('onoff').Gpio;

const thirstyPlants = new Gpio(4, 'out');
const mockedWaterPump = new Gpio(27, 'out');
const mockedMoistureSensor = new Gpio(26, 'in', 'rising');


mockedMoistureSensor.watch(function(err, value){
    if(err){
        console.error('There was an error', err);
        return;
    };
    console.log('Plants are thirsty!');
    thirstyPlants.writeSync(1);
    setTimeout(waterStart, 1500);
});

const waterStart = function(){
    console.log('watering plants');
    mockedWaterPump.writeSync(1);
    setTimeout(waterStop, 5000);
};

const waterStop = function(){
    console.log('plants are watered, turning off pump');
    mockedWaterPump.writeSync(0);
    setTimeout(wateredPlants, 1750);
};

const wateredPlants = function(){
    console.log('Plants are well hydrated');
    const watered = function(){
        thirstyPlants.writesync(0);
    };
    setTimeout(thirstyPlants, 500);
    thirstyPlants.writeSync(0);
    mockedWaterPump.writeSync(0);
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