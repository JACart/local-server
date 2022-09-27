let uiSocket
const { uiOutgoingEvents, uiIncomingEvents } = require('./connections.js')
const destinations = require('./destinations')
let timeoutGPS
var position = [38.433859, -78.862175]

module.exports = (io, fullMap) => {
  uiOutgoingEvents.map((x) => {
    eventManager.on(x, (data) => {
      io.of('/ui').emit(x, data)
    })
  })

  io.of('/ui').on('connection', (socket) => {
    socket.emit('ui-init', CARTSTATE())
    socket.emit('get-destinations', destinations)
    socket.emit('fullMap', fullMap)
    uiSocket = socket
    socket.on('pullover', (x) => console.log('pullover: ' + x))
    socket.on('speed', (x) => console.log("Speed: " + x))
    uiIncomingEvents.map((x) => {
      socket.on(x, (data) => eventManager.emit(x, data))
    })
  })
}
