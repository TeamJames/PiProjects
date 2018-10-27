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
    waterStart();
});

// function waterStart(){
//     console.log('watering plants');
//     mockedWaterPump.writeSync(1);
//     setTimeout(() => {
//         console.log('turning off the water');
//         mockedWaterPump.writeSync(0);
//         wateredPlants();
//     }, 500);
// };

function waterStart(){
    console.log('watering plants');
    const bill = function(){
        console.log('plants are watered');
        unexportOnClose();
    };
    setTimeout(bill, 5000);

};


// function waterStop(){
//     console.log('turning off the water');
//     mockedWaterPump.writeSync(0);
//     wateredPlants();
// };

function wateredPlants(){
    thirstyPlants.writeSync(0);
    console.log('Plants are well hydrated');
    unexportOnClose();
};

function unexportOnClose(){
    thirstyPlants.writeSync(0);
    mockedWaterPump.writeSync(0);
    thirstyPlants.unexport();
    mockedWaterPump.unexport();
    mockedMoistureSensor.unexport();
    console.log('growbox shut down');
};

process.on('SIGINT', unexportOnClose);