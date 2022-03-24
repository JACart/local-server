const socket = require('socket.io-client/lib/socket');
const { speechOutgoingEvents, speechIncomingEvents } = require('./connections.js')

module.exports = (io) => {

    speechOutgoingEvents.map((x) => {
        eventManager.on(x, (data) => {
            io.of('/speech').emit(x, data)
        })
    })



    console.log("Init speech");

    const destinations = require('./destinations')

    io.of('/speech').on('connection', socket => {
        console.log("Speech connected");

        socket.on('listening', (x) => console.log('listening: ' + x))
        
        speechIncomingEvents.map((x) => {
            socket.on(x, (data) => eventManager.emit(x, data))
          })
        socket.on('destination', (x) => eventManager.emit('change-destination', x))
        // socket.on('speech', data => {
        //     console.log(data);
        //     if (CARTSTATE.state === 'transit-start' && data === 'pullover') {
        //         // check if cart is 
        //         eventEmitter.emit('pullover')
        //     }

        //     if (CARTSTATE.state === 'transit-start' && data === 'resume') {
        //         // check if cart is 
        //         eventEmitter.emit('resume-driving')
        //     }
        //     // if cart is stopped and user can pick destination

        //     if (CARTSTATE.state === 'transit-start' && destinations[data]) {

        //     }


        // })
        
    })
}

