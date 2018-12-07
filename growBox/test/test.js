'use strict';

function drainPump(){
    function logger(){
        console.log('logging');
    };
    setInterval(logger, 1000);
};

module.exports = drainPump();