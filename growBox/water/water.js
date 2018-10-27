'use strict';

const serverStatus = new Gpio(21, 'out');
const thirstyPlants = new Gpio(12, 'out');
const mockedWaterPump = new Gpio(20, 'out');
const mockedDrainValve = new Gpio(16, 'out');


    function waterStart() {
        console.log('water pump on');
        mockedWaterPump.writeSync(1);
        setTimeout(waterStop, 5000);
    };

    function waterStop() {
        console.log('water pump off');
        mockedWaterPump.writeSync(0);
    };

    function startDrainingWaste() {
        console.log('opening drain valve');
        mockedDrainValve.writeSync(1);
        setTimeout(stopDrainingWaste, 3000);
    };

    function stopDrainingWaste() {
        console.log('closing drain valve');
        mockedDrainValve.writeSync(0);
    };

    function reset() {
        thirstyPlants.writeSync(0);
        mockedWaterPump.writeSync(0);
        mockedDrainValve.writeSync(0);
        console.log('growBox ready');
    };

module.exports = waterStart, waterStop, startDrainingWaste, stopDrainingWaste, reset;

