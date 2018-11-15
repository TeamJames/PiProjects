'use strict';

function currentTime(){
  let date = new Date();
  let time = {};
  time.minutes = date.getMinutes();
  time.seconds = date.getSeconds();
  return time;
};

module.exports = currentTime;