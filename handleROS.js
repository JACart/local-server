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

    socket.on('velocity', (data) => {
      //Convert Kilometer Per Her to MPH
      eventManager.emit('mph', Math.floor(data * 0.621371))
    })
  })
  io.of('/ros').on('error', async (socket) => {
    console.log('error connecting -- reconnecting')
    socket.rosConnect();
  })
}
