'use strict';

const Gpio = require('onoff').Gpio;

export const bill = new Gpio(20, 'out');