'use strict';

var socket = io();
document.onLoad = function(){
    var lightbox = document.getElementById("light");
    lightbox.addEventListener("change", function(){
        socket.emit("light", Number(this.checked));
    })
    socket.on('light', function(data){
        document.getElementById("light").checked = data;
        socket.emit("light", data);
    }
    });
};
