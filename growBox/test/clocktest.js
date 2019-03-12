'use strict';

let state = {
    hours: 5,
    minutes: 30
};
function logic(marty) {
    const clock = require('../lights/clock.js');
    let time = clock();
    console.log(time.hours + ':' + time.minutes + ':' + time.seconds);
    console.log('marty.hours', marty.hours);
    console.log('marty.minutes', marty.minutes);


};

// setInterval(logic, 1000);

function bill(){
    ted(state.hours);    
};
function ted(number){
    console.log(number);
};
setInterval(bill, 1000);

module.exports = logic;