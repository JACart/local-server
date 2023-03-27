/**
 * Connections are unique strings which identify socket names. This is used by the handle classes
 * which iterate through each element appropriately and connect a socket to each string.
 * 
 * Elements are to be read as if in the eyes of the Local Server. speechOutGoingEvents are socket events
 * going out to the Speech system. speechIncomingEvents are socket events coming from the speech system.
 * Each event is represented by a string in each element.
 */

module.exports = {
  // mongo: 'mongodb://localhost/jmu-local',
  cartId: 'jakart',
  speechOutgoingEvents: [
    'tts',
    'get-destinations-name',
    'get-destinations',
  ],
  speechIncomingEvents: [
    'speech',
    'listening',
    'tts',
    'pullover',
    'destination',
    'transcript',
  ],

  uiOutgoingEvents: [
    'ui-init',
    'summon',
    'pose',
    'passenger-unsafe',
    'summon-cancel',
    'summon-finish',
    'path',
    'gps',
    // 'transit-start', // change
    // 'transit-end',
    'audio',
    'reset-client', //change
    'passenger-exit',
    'speech',
    'listening',
    // 'passenger-video',
    'change-destination',
    'change-pullover',
    'mph',
    'fullMap',
    'research',
    'pose-oob',
    'occupants',
  ],
  uiIncomingEvents: [
    'change-destination',
    'destination', //
    'transit-await',
    'pullover',
    'resume-driving',
    'tts',
    'speed',
  ],
  rosIncomingEvents: [
    'gps',
    // 'passenger-unsafe',
    // 'transit-start',
    'arrived',
    // 'audio',
    'passenger-video',
    'cart-video',
    // 'passenger-exit',
    'pose-oob',
    'occupants',
  ],
  rosOutgoingEvents: [
    // 'transit-await',
    'pull-over',
    'resume-driving',
    'drive-to',
  ],

  onlineIncomingEvents: [
    'pullover',
    'destination',
    'tts',
  ],

  onlineOutgoingEvents: [
    'transcript',
    'get-destinations',
    'gps',
    'path',
    'logs',
    'mph',
    'connect',
    'summon-cancel',
    'summon-finish',
    'change-pullover',
    'change-destination',
    'cart-active',
  ],
}

/* base state
const state = {
  _id: CARTID,
  summonlatitude: 0,
  summonlongitude: 0,
  destination: '',
  active: false,
  userId: '',
  state: 'idle',
}
*/
