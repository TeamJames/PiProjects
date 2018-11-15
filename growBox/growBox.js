'use strict';

const lights = require('./lights/lights.js');

console.log('starting up growbox');

lights();
// water();
// const Gpio = require('onoff').Gpio;

// const light = new Gpio(22, 'out')

// light.writeSync(1);
// function off(){
//     light.writeSync(0);
//     light.unexport();
// };
// setTimeout(off, 5000);

