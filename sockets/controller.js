const { Socket } = require('socket.io');

const socketController = async( socket = new Socket(), io ) => {
    io.on('connection', (socket) => {
        socket.on('find-driver', ({points}) => {
            console.log(points);
            const counter = setInterval(() => {
                const coords = points.shift();
                if (!coords) {
                    clearInterval(counter);
                } else {
                    socket.emit('position', {coords});
                }
            }, 2500)
        })
    })
}

module.exports = {
    socketController
}