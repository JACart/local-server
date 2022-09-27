const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const ioC = require('socket.io-client')
const cartState = require('./cartState')
const handleUI = require('./handleUI')
const handleROS = require('./handleROS')
const handleSpeech = require('./handleSpeech')
const handleOnline = require('./handleOnline')

const events = require('events').EventEmitter
const handleZig = require('./handleZig')

app.get('/state', (req, res) => {
  res.send('ok ok')
})

global.eventManager = new events()
  ; (async function init() {
    const args = process.argv.slice(2)
    console.log(args)
    cartState.init(args.includes('online'), args.includes('pose'))
    handleUI(io, args.includes('fullmap'))  // pass 'fullmap' on start to load full map. no args runs small map.
    handleSpeech(io)
    // handleZig(io)
    
    if (args.includes('online')) {
      handleOnline(io)
    }
    
    //pass 'rosoff' on start to turn off ROS. no args runs ROS
    if (!args.includes('rosoff')) {
      require('./handleROSLib')()
    } else {
      console.log("\n\n\nROS DISABLED\n\n\n")
    }

    handleROS(io) // socket io
    server.listen(8022, () => {
      console.log('local-socket-server started at ' + 8022)
      cartState.rosConnect()
    })
  })()
