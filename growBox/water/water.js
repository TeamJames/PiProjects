'use strict';

class Water {
console.log('growBox started on port 420');

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
    setTimeout(stopDrainingWaste, 3000);
};

const stopDrainingWaste = function(){
    console.log('closing drain valve');
    mockedDrainValve.writeSync(0);
};

function reset() {
    thirstyPlants.writeSync(0);
    mockedWaterPump.writeSync(0);
    mockedDrainValve.writeSync(0);
    console.log('growBox ready');
};

};

module.exports = Water;

