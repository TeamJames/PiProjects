'use strict';

//  instead of requiring the Gpio, can I declare a variable as gpio.readsync()?

// const Gpio = require('onoff').Gpio;
// const waterPumpLED = new Gpio(20, 'out');

// module.exports = {
//     testy() {
//         return console.log('testy');
//     },

//     waterStop() {
//         console.log('water pump off');
//         thirstyPlants.writeSync(0);
//         console.log('plants are well hydrated');
//         waterPumpLED.writeSync(0);
//         reservoir += 1;
//         if (reservoir === 10) {
//             return drainWaste();
//         };
//         status();
//     },
//     waterStart() {
//         console.log('water pump on');
//         waterPumpLED.writeSync(1);
//         setTimeout(this.waterStop, 2000);
//     }
// };


let bill = 5;
let ted = bill.toString();
console.log(ted);
console.log('0' + ted);