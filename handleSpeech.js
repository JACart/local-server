module.exports = (io) => {
    console.log("Init speech");

    const destinations = require('./destinations')

    io.of('/speech').on('connection', socket => {
        console.log("Speech connected");
        socket.on('speech', data => {
            console.log(data);
            if (CARTSTATE.state === 'transit-start' && data === 'pullover') {
                // check if cart is 
                eventEmitter.emit('pullover')
            }

            if (CARTSTATE.state === 'transit-start' && data === 'resume') {
                // check if cart is 
                eventEmitter.emit('resume-driving')
            }
            // if cart is stopped and user can pick destination

            if (CARTSTATE.state === 'transit-start' && destinations[data]) {

            }


        })
        socket.on('listening', data => {
            eventManager.emit('listening', data)
        })
    })
}

