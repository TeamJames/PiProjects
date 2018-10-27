'use strict';
const var = import('../grow.js');

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

