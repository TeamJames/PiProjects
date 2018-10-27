'use strict';


class Water {
    // console.log('growBox started on port 420');

    // mockedMoistureSensor.watch(function(err, value) {
    //     if (err) {
    //         return console.error('There was an error', err);;
    //     };
    //     console.log('Plants are thirsty!');
    //     thirstyPlants.writeSync(1);
    //     setTimeout(waterStart, 2000)
    // });

    waterStart(callback) {
        console.log('water pump on');
        mockedWaterPump.writeSync(1);
        setTimeout(waterStop, 5000);
    };

    waterStop() {
        console.log('water pump off');
        mockedWaterPump.writeSync(0);
    };

    startDrainingWaste() {
        console.log('opening drain valve');
        mockedDrainValve.writeSync(1);
        setTimeout(stopDrainingWaste, 3000);
    };

    stopDrainingWaste() {
        console.log('closing drain valve');
        mockedDrainValve.writeSync(0);
    };

    reset() {
        thirstyPlants.writeSync(0);
        mockedWaterPump.writeSync(0);
        mockedDrainValve.writeSync(0);
        console.log('growBox ready');
    };

};

module.exports = Water;

