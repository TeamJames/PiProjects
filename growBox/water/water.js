'use strict';

const Gpio = require('onoff').Gpio;
const mockedWaterPump = new Gpio(27, 'out');

const green = new Gpio(4, 'out');
export default class Water {

  start(){
    mockedWaterPump.writeSync(1);
  }
};