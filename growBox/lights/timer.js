'use strict';


let time1 = new Date();
let startUpTime = time1.getHours();

let lights = new Gpio(**pin number**, 'out');
let lightStatus = false;

let startTime = 8;
let stopTime = 22;


function checkLights(){
  setTimeout(checkLights, 300000);
};

function lightTimer(startTime, stopTime){
  let time2 = new Date();
  let checkTime = time2.getHours();
  if(checkTime >= startTime && checkTime <= stopTime){
    if(lightStatus = false){
      let timeCheck = new Date();
      console.log('turning lights on at:   ', timeCheck);
      lightStatus = true;
      lights.writeSync(1);
    };
  };
  else {
    let timeCheck2 = new Date();
    console.log('turning lights off at:    ', timeCheck2);
    lightStatus = false;
    lights.writeSync(0);
  };
};