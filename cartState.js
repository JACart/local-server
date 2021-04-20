global.CARTID = require('./connections').cartID
const fs = require('fs')
const destinations = require('./destinations')

let cartState
global.CARTSTATE = () => cartState

let pose = { passenger: false, safe: false }
// let pose = {}

const io = require('socket.io-client')
// const socket = io('http://35.238.125.238:8020/cart')
const socket = io('https://cart.av.cise.jmu.edu/cart')
// const socket = io('http://localhost:8020/cart')

module.exports.init = () => {
  eventManager.on('pose', (x) => (pose = x))

  eventManager.on('gps', (data) => {
    socket.emit('gps', data)
  })

  eventManager.on('path', (data) => {
    socket.emit('path', data)
  })

  eventManager.on('pose', (x) => {
    console.log(x)
    pose = x
  })

  eventManager.on('change-destination', () => {
    cartState.state = 'summon-finish'
    writeState()
  })

  socket.on('connect', () => {
    socket.emit('cart-connect', cartState)
  })

  // setTimeout(() => {
  //   cartState.userId = 'test'
  //   cartState.latitude = 38.433095
  //   cartState.longitude = -78.861054
  //   cartState.active = true
  //   cartState.state = 'summon-start'
  //   writeState()
  //   eventManager.emit('drive-to', cartState)
  //   eventManager.emit('summon', cartState)
  //   eventManager.emit('ui-init', cartState)
  //   eventManager.emit('path', Object.values(destinations))
  //   socket.emit('path', Object.values(destinations))
  // }, 2000)

  socket.on('summon-cancel', () => {
    eventManager.emit('summon-cancel')
    cartState.state = 'idle'
    cartState.userId = ''
    ;(cartState.destination = ''), writeState()
    eventManager.emit('ui-init', cartState)
  })

  socket.on('reset-client', () => {
    eventManager.emit('reset-client')
    cartState.state = 'idle'
    cartState.destination = ''
    cartState.userId = ''
    writeState()
  })

  socket.on('summon', (data) => {
    if (!pose.passenger) {
      cartState.userId = data.id
      cartState.latitude = data.latitude
      cartState.longitude = data.longitude
      cartState.state = 'summon-start'
      writeState()
      eventManager.emit('drive-to', data)
      eventManager.emit('summon', data)
      eventManager.emit('ui-init', cartState)
    } else {
      console.log('[CART NOT EMPTY] summon request ignored.')
    }
  })

  eventManager.on('destination', (name) => {
    function driveToDestination() {
      if (pose.passenger && pose.safe) {
        if (destinations[name]) {
          cartState.destination = name

          setTimeout(() => {
            cartState.state = 'transit-start'
            eventManager.emit('drive-to', destinations[name])
            eventManager.emit('ui-init', cartState)
            socket.emit('destination', name)
            socket.emit('transit-start', cartState)
          }, 4)
          // might need to remove json.stringify
          writeState()
        }
      } else {
        console.log(
          '[Passenger not found || passenger not safe] Drive request ignored.'
        )
        setTimeout(() => {
          driveToDestination()
        }, 2000)
      }
    }
  })

  eventManager.on('pullover', (x) => {
    console.log('PULL OVER')
    cartState.pullover = x
    writeState()
  })

  eventManager.on('arrived', () => {
    if (cartState.destination === '') {
      cartState.state = 'summon-finish'
    } else {
      cartState.state = 'transit-end'
      setTimeout(() => {
        console.log('checking if passenger still in cart . . .')
        let interval = null
        interval = setInterval(() => {
          console.log(pose)
          if (!pose.passsenger) {
            clearInterval(interval)
            cartState.state = 'idle'
            cartState.pullover = false
            cartState.userId = ''
            cartState.destination = ''
            writeState()
            eventManager.emit('ui-init', cartState)
            console.log('passenger got out exiting still in')
            socket.emit('passenger-exit')
          } else {
            console.log('passenger still in')
          }
        }, 1000)
      }, 3000)
    }
    writeState()
    eventManager.emit('ui-init', cartState)
    socket.emit(cartState.state)
  })

  // cartState = JSON.parse(fs.readFileSync('../cart.json', 'utf-8'))
  cartState = {
    destination: '',
    active: true,
    state: 'summon-finish',
    _id: 'jakart',
    userId: 'lskjdfh',
    latitude: 38.433095,
    longitude: -78.861054,
    pullover: false,
  }

  if (
    cartState.state === 'summon-start' ||
    cartState.state === 'transit-start'
  ) {
    eventManager.emit('drive-to', cartState)
  }

  return cartState
}

module.exports.rosConnect = () => {
  cartState.active = true
  writeState()
  socket.emit('cart-active', true)
  eventManager.emit('ui-init', cartState)
}

module.exports.rosDisconnect = () => {
  cartState.active = false
  writeState()
  socket.emit('cart-active', false)
  eventManager.emit('ui-init', cartState)
}

function writeState() {
  fs.writeFileSync('cart.json', JSON.stringify(cartState))
}
