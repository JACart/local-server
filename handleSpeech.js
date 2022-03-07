module.exports = (io) => {
    console.log("Init speech");
    io.of('/speech').on('connection', socket => {
        console.log("Speech connected");
        socket.on('speech', data => {
            console.log(data);
            if (CARTSTATE.state === 'transit-start' && data === 'pullover') {
                // check if cart is 
                eventEmitter.emit('pullover')
            }
            // if cart is stopped and user can pick destination


        })
        socket.on('listening', data => {
            eventManager.emit('listening', data)
        })
    })
}

