'use strict';

//  instead of requiring the Gpio, can I declare a variable as gpio.readsync()?

const Gpio = require('onoff').Gpio;
const pump = new Gpio(4, 'out');


function runPump() {
    pump.writeSync(1);
    console.log('pump running');
};

// function closePump() {
//     pump.writeSync(0);
//     console.log('pump off');
// };


// process.on('SIGINT', closePump);


runPump();