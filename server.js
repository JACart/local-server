const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cartState = require('./cartState')
const handleUI = require('./handleUI')
const handleROS = require('./handleROS')
const handlePose = require('./handlePose')

const events = require('events').EventEmitter

app.get('/state', (req, res) => {
  res.send('ok ok')
})

global.eventManager = new events()
;(async function init() {
  cartState.init()
  handleUI(io)
  handlePose(io)
  // require('./handleROSLib')()
  handleROS(io) // socket io
  server.listen(8021, () => {
    console.log('local-socket-server started at 8021')
  })
})()
