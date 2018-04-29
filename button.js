var Gpio = require('onoff').Gpio;
var RED = new Gpio(4, 'out');
var pushButton = new Gpio(17, 'in', 'both');
console.log('button active');
pushButton.watch(function (err, value) {
    if (err) {
        console.error('There was an error', err);
        return;
    }
    red.writeSync(value);
    toggleGreen();
});
function toggleGreen(){
    if(readSync === 0){
        writeSync(1);
    } else {
        writeSync(0);
    };
};

function unexportOnClose(){
    RED.writeSync(0);
    GREEN.writeSync(0);
    RED.unexport();
    GREEN.unexport();
    pushButton.unexport();
    console.log('Thank You!');
};

process.on('SIGINT', unexportOnClose);