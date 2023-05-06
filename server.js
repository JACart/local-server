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

    // pass 'fullmap' on start to load full map. no args runs small map.
    handleUI(io, args.includes('fullmap'), args.includes('research'))  
    handleSpeech(io)
    // handleZig(io)
    
    // pass 'online' on start to run in onlinemode. no args runs offline
    if (args.includes('online')) {
      handleOnline(io)
    }
    
    // pass 'rosoff' on start to turn off ROS. no args runs ROS. Used for testing locally without need for cart connection.
    if (!args.includes('rosoff')) {
      require('./handleROSLib')()
    } else {
      console.log('\33[31m' + "\nROS DISABLED\n" + '\33[37m')
    }

    if (args.includes('fullmap')) {
      console.log('\033[93m' + "FullMap launched" + '\33[37m')
    }
    if (args.includes('research')) {
      console.log('\033[93m' + "Operating in Research Mode" + '\33[37m')
    }

    handleROS(io) // socket io
    server.listen(8022, () => {
      console.log('local-socket-server started at ' + 8022)
      cartState.rosConnect()
    })
  })()
