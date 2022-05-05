const io = require('socket.io-client')
// const socket = io('http://localhost:10000/cart')
const socket = io('https://cart.av.cise.jmu.edu/cart')
const cartState = require('./cartState')
const destinations = require('./destinations')

const { onlineIncomingEvents, onlineOutgoingEvents } = require('./connections.js')

module.exports = (nsp) => {
  console.log("Initializing online socket.");
    
  //Event mapper. Maps outgoing events from connections.js
  onlineOutgoingEvents.map((x) => {
      eventManager.on(x, (data) => {
        //nsp.of('/online').emit(x, data)
        socket.emit(x, data)
      })
    })

  //Connection sockets
  socket.on('connect', () => {
    console.log('CONNECTED: Online Socket Connected.')
    socket.emit('cart-connect', cartState)
  })
  socket.on('connect_error', (x) => console.log('Online Socket Error: ' + x))
  socket.on('disconnect', () => console.log('DISCONNECTED: Online Socket Disconnected.'))

  //Event mapper. Maps incoming events from connections.js
  onlineIncomingEvents.map((x) => {
      socket.on(x, (data) => eventManager.emit(x, data))
  })

  //Individual events
  socket.emit('get-destinations', destinations)

  socket.on('summon-cancel', () => {
    eventManager.emit('summon-cancel')
    cartState.state = 'idle'
    cartState.userId = ''
      ; (cartState.destination = ''), writeState()
    eventManager.emit('ui-init', cartState)
  })

  socket.on('reset-client', () => {
    eventManager.emit('reset-client')
    CARTSTATE.state = 'idle'
    CARTSTATE.destination = ''
    CARTSTATE.userId = ''
    writeState()
  })
}