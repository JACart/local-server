const ROSLIB = require('roslib')
const cartState = require('./cartState')
const distance = require('gps-distance')

const lastGPS = { latitude: 0, longitude: 0 }

let isPulledOver = false

let ros = new ROSLIB.Ros({
  url: 'ws://127.0.0.1:9090',
})

module.exports = () => {
  eventManager.on('drive-to', (data) => {
    console.log(`Latitude: ${data.latitude} | Longitude: ${data.longitude}`)
    pulloverHelper(false)
    SendDriveRequest(data.latitude, data.longitude)
  })
}

eventManager.on('change-destination', () => {
  pulloverHelper(true)
})

eventManager.on('pose', (x) => {
  if (CARTSTATE().state === 'idle' && (x.passenger && x.safe)) {
    CARTSTATE().state = 'summon-finish'
    console.log('PASSENGER ARRIVING')
    eventManager.emit('ui-init', CARTSTATE())
  }

  if (
    CARTSTATE().state === 'transit-start' &&
    (!x.passenger || !x.safe) &&
    !isPulledOver
  ) {
    // DISBALED PULL OVER MESSAGE
    //  pulloverHelper(true)
  }

  if (
    CARTSTATE().state === 'transit-start' &&
    x.passenger &&
    x.safe &&
    isPulledOver
  ) {
    pulloverHelper(false)
  }
})

eventManager.on('pullover', (status) => {
  pulloverHelper(status)
})

eventManager.on('tts', (speech) => {
  tts(speech)
})

ros.on('connection', function () {
  console.log('Connected to websocket server.')
  subscribeToTopics()
  cartState.rosConnect()
})

ros.on('error', function (error) {
  console.error(
    'Error connecting to websocket server, Check that ros bridge is running on port 9090'
  )
  cartState.rosDisconnect()
})

ros.on('close', function () {
  console.log('Connection to websocket server closed.')
  cartState.rosDisconnect()
})

function pulloverHelper(status) {
  const topic = new ROSLIB.Topic({
    ros: ros,
    name: '/stop',
    messageType: 'navigation_msgs/Stop',
  })
  const msg = new ROSLIB.Message({
    sender_id: { data: 'server' },
    distance: -1,
    stop: status,
  })
  console.log(msg)
  isPulledOver = status
  topic.publish(msg)
}

function subscribeToTopics() {
  new ROSLIB.Topic({
    ros: ros,
    name: '/arrived',
    messageType: 'std_msgs/String',
  }).subscribe((x) => {
    eventManager.emit('arrived')
  })

  new ROSLIB.Topic({
    ros: ros,
    name: '/cart_empty_safe',
    messageType: 'std_msgs/String',
  }).subscribe((x) => {
    console.log(x.data)
    eventManager.emit('pose', JSON.parse(x.data))
  })

  new ROSLIB.Topic({
    ros: ros,
    name: '/speech_text',
    messageType: 'std_msgs/String',
  }).subscribe((x) => {
    console.log(x.data)
    eventManager.emit('speech', x.data)
  })

  new ROSLIB.Topic({
    ros: ros,
    name: '/gps_send',
    messageType: 'navigation_msgs/LatLongPoint',
  }).subscribe((x) => {
    const data = { latitude: x.latitude, longitude: x.longitude }
    if (lastGPS.latitude !== 0) {
      const result = distance(
        lastGPS.latitude,
        lastGPS.longitude,
        x.latitude,
        x.longitude
      )
      if (result < 0.001) {
        eventManager.emit('gps', data)
        lastGPS = data
      } else {
        console.log('GPS Delta too big: ' + result + 'km')
      }
    } else eventManager.emit('gps', data)
  })

  new ROSLIB.Topic({
    ros: ros,
    name: '/gps_global_path',
    messageType: 'navigation_msgs/LatLongArray',
  }).subscribe((x) => {
    eventManager.emit(
      'path',
      x.gpspoints.map((e) => {
        return { latitude: e.latitude, longitude: e.longitude }
      })
    )
  })

  new ROSLIB.Topic({
    ros: ros,
    name: '/eta',
    messageType: 'std_msgs/UInt64',
  }).subscribe((x) => {
    eventManager.emit('eta', x.data)
  })
}

function tts(str) {
  const topic = new ROSLIB.Topic({
    ros: ros,
    name: '/text_speech',
    messageType: 'std_msgs/String',
  })
  const msg = new ROSLIB.Message({
    data: str,
  })

  console.log('Publishing  TTS request')
  topic.publish(msg)
}

function SendDriveRequest(latitude, longitude) {
  const topic = new ROSLIB.Topic({
    ros: ros,
    name: '/gps_request',
    messageType: 'navigation_msgs/LatLongPoint',
  })
  const msg = new ROSLIB.Message({
    latitude: latitude,
    longitude: longitude,
    elevation: 0,
  })

  console.log('Publishing drive to request')
  topic.publish(msg)
}
