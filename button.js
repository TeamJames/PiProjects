var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');
var pushButton = new Gpio(17, 'in', 'both');
console.log('button active');
pushButton.watch(function (err, value) {
    if (err) {
        console.error('There was an error', err);
        return;
    }
    LED.writeSync(value);
});

function unexportOnClose(){
    LED.writeSync(0);
    LED.unexport();
    pushButton.unexport();
    console.log('Thank You!');
};

process.on('SIGINT', unexportOnClose);