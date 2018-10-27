'use strict';

const Gpio = require('onoff').Gpio;

const thirstyPlants = new Gpio(4, 'out');
const mockedWaterPump = new Gpio(27, 'out');
const mockedDrainValve = new Gpio(6, 'out');
const mockedMoistureSensor = new Gpio(26, 'in', 'rising');

console.log('growBox started on port 420');

mockedMoistureSensor.watch(function(err){
    if(err){
        return console.error('There was an error', err);;
    };
    console.log('Plants are thirsty!');
    thirstyPlants.writeSync(1);
    setTimeout(waterStart, 2000);
});

function waterStart() {
    console.log('water pump on');
    mockedWaterPump.writeSync(1);
    setTimeout(waterStop, 5000);
    setTimeout(startDrainingWaste, 5250);
    function hydrated() {console.log('Plants are well hydrated');}
    setTimeout(hydrated, 9250);
    setTimeout(shutDown, 9500);
    //  doing all this with timers to simulate real-world async actions that will rely on sensor input and event listeners later on

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