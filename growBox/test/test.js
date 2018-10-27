'use strict';

module.exports = {
  testy(){
    return console.log('testy');
  }
  waterStart() {
    console.log('water pump on');
    waterPumpLED.writeSync(1);
    setTimeout(waterStop, 2000);
}
};