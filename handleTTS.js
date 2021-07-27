let speechSocket

module.exports = (io) => {
    speechSocket = io.of('/speech')
    speechSocket.on('connection', (socket) => {
        console.log('speech connected')

        setInterval(() => {
            speechSocket.emit('tts', 'Driving to Gym')
        }, 1000);

        socket.on('spoke', (data) => {
            console.log(data);
        })


    })
}