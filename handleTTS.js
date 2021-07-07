let speechSocket

module.exports = (io) => {
    speechSocket = io.of('/speech')
    speechSocket.on('connection', (socket) => {
        console.log('speech connected')

        setInterval(() => {
            speechSocket.emit('tts', 'Driving to Gym')
        }, 1000);

        speechSocket.on('spoke', (data) => {
            console.log(data);
        })

        speechSocket.on('test', testStr => {
            console.log("test success")
        })

    })
}