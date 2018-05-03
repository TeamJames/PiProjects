'use strict';

var socket = io();
window.onLoad = function(){
    var lightbox = $("#light");
    lightbox.on('change', function(){
        socket.emit("light", Number(this.checked))
    });
    socket.on('light', function(){
        $("#light").checked = data;
        socket.emit("light", data);
    });
};
