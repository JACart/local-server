const { rosIncomingEvents, rosOutgoingEvents } = require('./connections.js')
const cartState = require('./cartState')

module.exports = (io) => {
  rosOutgoingEvents.map((x) => {
    eventManager.on(x, (data) => {
      io.of('/ros').emit(x, data)
    })
  })

  io.of('/ros').on('connection', async (socket) => {
    uiSocket = socket
    rosIncomingEvents.map((x) => {
      socket.on(x, (data) => eventManager.emit(x, data))
    })
    cartState.rosConnect()
    socket.on('disconnect', () => {
      cartState.rosDisconnect()
    })
 
  })
  io.of('/ros').on('error', async (socket) => {
    console.log('error connecting -- reconnecting')
    socket.rosConnect();
  })
}
