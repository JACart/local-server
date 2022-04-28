global.CARTID = require('./connections').cartID
const fs = require('fs')
const destinations = require('./destinations')
let lasttime = Date.now()
let lastGPS = { latitude: null, longitude: null }
let cartState
global.CARTSTATE = () => cartState
let pose = { passenger: false, safe: false }
var distance = require('gps-distance');
// let pose = {}

const io = require('socket.io-client')

// const socket = io('https://cart.av.cise.jmu.edu/cart')
let socket = null
let onlineMode = false
global.POSE = true
module.exports.init = (online = false, pose = true) => {
  console.log(
    `Server started in ${online ? 'ONLINE' : 'OFFLINE'} with pose tracking ${pose ? 'ENABLED' : 'DISABLED'
    }`
  )
  POSE = pose
  onlineMode = false
  cartState = {
    destination: '',
    active: true,
    state: 'idle',
    _id: 'jakart',
    userId: '',
    latitude: 38.433095,
    longitude: -78.861054,
    pullover: false,
  }
  if (online) {
    // socket = io('http://157.245.126.151:10000/cart')
    socket = io('http://localhost:10000/cart')
    // socket = io('https://cart.av.cise.jmu.edu/cart')
    socket.on('pullover', (data) => {
      console.log(data)
      eventManager.emit('pullover', data)
    })
    socket.on('destination', (data) => {
      console.log(data)
      eventManager.emit('destination', data)
    })
    socket.on('tts', (data) => {
      eventManager.emit('tts', data)
    })
    socket.emit('get-destinations', destinations)
  } else {
    socket = null
    cartState.state = 'summon-finish'
    cartState.userId = 'dskhf'
  }

  eventManager.on('pose', (x) => (pose = x))

  eventManager.on('gps', (data) => {
    // console.log(data)
    onlineMode && socket.emit('gps', data)
  })

  eventManager.on('path', (data) => {
    onlineMode && socket.emit('path', data)
  })

  eventManager.on('pose', (x) => {
    pose = x
  })

  eventManager.on('change-destination', () => {
    cartState.state = 'summon-finish'
    writeState()
  })


  eventManager.on('gps', data => {

    const diff = Date.now() - lasttime
    console.log("Diff: " + diff)
    // if (lastGPS.latitude && lastGPS.longitude && data.latitude && data.longitude) {
    //   var dist = distance(data.latitude, data.longitude, lastGPS.latitude, lastGPS.longitude)
    //   console.log("Distance: " + dist)

    //   var mph = dist / (diff / 1000 / 3600)
    //   mph = Math.floor(mph)
    //   console.log("mph: " + mph) //mph
    //   eventManager.emit('mph', mph)

    //   onlineMode && socket.emit('speed', mph) //sending the speed to the cloud
    // }
    lasttime = Date.now()
    lastGPS = data
  })

  eventManager.on('logs', data => {
    // console.log(data)
    onlineMode && socket.emit('logs', data)
  })

  onlineMode &&
    socket.on('connect', () => {
      onlineMode && socket.emit('cart-connect', cartState)
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
  //   onlineMode && socket.emit('path', Object.values(destinations))
  // }, 2000)

  onlineMode &&
    socket.on('summon-cancel', () => {
      eventManager.emit('summon-cancel')
      cartState.state = 'idle'
      cartState.userId = ''
        ; (cartState.destination = ''), writeState()
      eventManager.emit('ui-init', cartState)
    })

  onlineMode &&
    socket.on('reset-client', () => {
      eventManager.emit('reset-client')
      cartState.state = 'idle'
      cartState.destination = ''
      cartState.userId = ''
      writeState()
    })

  onlineMode &&
    socket.on('summon', (data) => {
      console.log('cart summoned')
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

    onlineMode && socket.emit('destination', name) //sending the destination to the cloud
    

    console.log(name)
    function driveToDestination() {
      //if (pose.passenger && pose.safe) {
      if (true) {
        if (destinations[name]) {
          cartState.destination = name
          setTimeout(() => {
            cartState.state = 'transit-start'
            eventManager.emit('tts', "Destination selected, Heading to " + destinations[name].pronun)
            eventManager.emit('drive-to', destinations[name])
            eventManager.emit('ui-init', cartState)
            onlineMode && socket.emit('destination', name)
            onlineMode && socket.emit('transit-start', cartState)
            eventManager.emit('change-destination', name)
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
    driveToDestination()
  })

  eventManager.on('pullover', (x) => {
    console.log('PULL OVER')
    onlineMode && socket.emit('pullover', x)
    cartState.pullover = x
    if (x) {
      eventManager.emit('tts', "Pullover Invoked. Cart is stopping.")
    } else {
      eventManager.emit('tts', "Resuming to drive.")
    }
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
          // console.log(pose)
          if (!pose.passsenger) {
            clearInterval(interval)
            cartState.state = 'idle'
            cartState.pullover = false
            cartState.userId = ''
            cartState.destination = ''
            writeState()
            eventManager.emit('ui-init', cartState)
            console.log('passenger got out exiting still in')
            onlineMode && socket.emit('passenger-exit')
          } else {
            console.log('passenger still in')
          }
        }, 1000)
      }, 3000)
    }
    writeState()
    eventManager.emit('tts', "Arrived.")
    eventManager.emit('ui-init', cartState)
    onlineMode && socket.emit(cartState.state)
  })

  // cartState = JSON.parse(fs.readFileSync('../cart.json', 'utf-8'))

  if (
    cartState.state === 'summon-start' ||
    cartState.state === 'transit-start'
  ) {
    eventManager.emit('drive-to', cartState)
  }

  return cartState
}

module.exports.rosConnect = () => {
  console.log('ros connected');
  cartState.active = true
  setTimeout(() => {
    onlineMode && socket.emit('cart-active', true)
    writeState()
    // console.log(cartState);
    eventManager.emit('ui-init', cartState)
  }, 1000)
}

module.exports.rosDisconnect = () => {
  cartState.active = false
  writeState()
  onlineMode && socket.emit('cart-active', false)
  eventManager.emit('ui-init', cartState)
}

function writeState() {
  // fs.writeFileSync('cart.json', JSON.stringify(cartState))
}
