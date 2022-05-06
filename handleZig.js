const { zigOutgoingEvents, zigIncomingEvents } = require('./connections.js')

module.exports = (io) => {
  zigOutgoingEvents.map((x) => {
    eventManager.on(x, (data) => {
      io.of('/zig').emit(x, data)
    })
  })

  io.of('/zig').on('connection', (socket) => {
    console.log("Zig Connected")
    zigIncomingEvents.map((x) => {
      socket.on(x, (data) => eventManager.emit(x, data))
    })

    socket.on('zig', (x) => console.log(x))
    socket.on('pullover',(x) => console.log('ZIG pullover: '+ x))
  })
}
