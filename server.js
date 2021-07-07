const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cartState = require('./cartState')
const handleUI = require('./handleUI')
const handleROS = require('./handleROS')
const handleTTS = require('./handleTTS')

const events = require('events').EventEmitter

app.get('/state', (req, res) => {
  res.send('ok ok')
})

global.eventManager = new events()
;(async function init() {
  const args = process.argv.slice(2)
  cartState.init(args.includes('online'), args.includes('pose'))
  handleUI(io)
  handleTTS(io)

  // require('./handleROSLib')()
  // handleROS(io) // socket io
  server.listen(8021, () => {
    console.log('local-socket-server started at ' + 8021)
    cartState.rosConnect()
  })
})()
