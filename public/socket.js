'use strict';

var socket = io();
document.onLoad = function(){
    var lightbox = ${#light};
    lightbox.addEventListener("change", function(){
        socket.emit("light", Number(this.checked));
    })
    socket.on('light', function(data){
        ${#light} = data;
        socket.emit("light", data);
    })
};
