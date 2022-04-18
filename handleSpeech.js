const socket = require('socket.io-client/lib/socket');
const { speechOutgoingEvents, speechIncomingEvents } = require('./connections.js')

var transcript;

module.exports = (io) => {

    speechOutgoingEvents.map((x) => {
        eventManager.on(x, (data) => {
            io.of('/speech').emit(x, data)
        })
    })



    console.log("Init speech");

    const destinations = require('./destinations')

    io.of('/speech').on('connection', socket => {
        console.log("Speech connected")
        socket.emit('get-destinations-name', Object.keys(destinations))
        socket.emit('get-destinations', destinations)
        socket.on('listening', (x) => console.log('listening: ' + x))

        speechIncomingEvents.map((x) => {
            socket.on(x, (data) => eventManager.emit(x, data))
        })
        socket.on('destination', (x) => eventManager.emit('change-destination', x))
        socket.on('pullover', (x) => eventManager.emit('change-pullover', x))

        socket.on('transcript', (x) => eventManager.emit('logs', x))
    })
}

