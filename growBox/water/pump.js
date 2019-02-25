'use strict';
function manualPump() {
    const Gpio = require('onoff').Gpio;
    let drainButton = new Gpio(4, 'in', 'falling', {
      debounceTimeout: 75
    });
    let drainPumpIndicatorLight = new Gpio(27, 'out');
    let drainPumpRelay = new Gpio(24, 'out');
    drainPumpRelay.writeSync(1);
    drainButton.watch(function (err, value) {
        if (err) {
            return console.error('There was an error', err);
        };
        if (drainPumpIndicatorLight.readSync() === 0) {
            //   pumpOn();
            console.log('Running Drain Pump');
            drainPumpIndicatorLight.writeSync(1);
            drainPumpRelay.writeSync(0);
        }
        else {
            console.log('Drain Pump Off');
            drainPumpIndicatorLight.writeSync(0);
            drainPumpRelay.writeSync(1);
        }
    });

  function unexportPump(){
    drainButton.unexport();
    drainPumpIndicatorLight.unexport();
    drainPumpRelay.unexport();
    console.log('Pump shut down');
  };

  process.on('SIGINT', unexportPump);
};



module.exports = manualPump;