'use strict';
function tester() {
    const Gpio = require('onoff').Gpio;
    let drainButton = new Gpio(4, 'in', 'falling');
    let drainPumpIndicatorLight = new Gpio(27, 'out');

    drainButton.watch(function (err, value) {
        if (err) {
            return console.error('There was an error', err);
        };
        if (drainPumpIndicatorLight.readSync() === 0) {
            //   pumpOn();
            console.log('Running Drain Pump');
            drainPumpIndicatorLight.writeSync(1);
        }
        else {
            console.log('Drain Pump Off');
            drainPumpIndicatorLight.writeSync(0);
        }
    });

};



module.exports = tester;