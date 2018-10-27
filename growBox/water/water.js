'use strict';
const lights = import('../grow.js');

    function waterStart() {
        console.log('water pump on');
        this.mockedWaterPump.writeSync(1);
        setTimeout(waterStop, 5000);
    };

    function waterStop() {
        console.log('water pump off');
        lights.mockedWaterPump.writeSync(0);
    };

    function startDrainingWaste() {
        console.log('opening drain valve');
        this.mockedDrainValve.writeSync(1);
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

    function test() {
        console.log('testtesttesttesttesttest');
    };

module.exports = test,waterStart, waterStop, startDrainingWaste, stopDrainingWaste, reset;

