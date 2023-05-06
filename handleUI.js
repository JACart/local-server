let uiSocket
const { uiOutgoingEvents, uiIncomingEvents } = require('./connections.js')
const destinations = require('./destinations')
let timeoutGPS
var position = [38.433859, -78.862175]

module.exports = (io, fullMap, research) => {
  uiOutgoingEvents.map((x) => {
    eventManager.on(x, (data) => {
      io.of('/ui').emit(x, data)
    })
  })

  io.of('/ui').on('connection', (socket) => {
    socket.emit('ui-init', CARTSTATE())

    // Emit all destinations located within destinations.js
    socket.emit('get-destinations', destinations)

    // Emit which mode is activated. This is determined by arguments passed into npm start {args}
    socket.emit('fullMap', fullMap)
    socket.emit('research', research)

    uiSocket = socket
    socket.on('pullover', (x) => console.log('pullover: ' + x))
    socket.on('speed', (x) => console.log("Speed: " + x))
    uiIncomingEvents.map((x) => {
      socket.on(x, (data) => eventManager.emit(x, data))
    })
  })
}
