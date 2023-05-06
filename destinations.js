/**
 * Each destination contains the information needed to be displayed on the UI as well as for ROS to know the location selected.
 * The ID is used as a unique identifier for each location. This must be simplistic (no spaces, special characters, etc)
 * 
 * Latitude/Longitude is gathered using GPS coords (best way to grab is using google maps). Be sure to use the mathmatical coordinates
 * (ie 38.777, -75.333) rather than the user friendly coordinates (ie 48'200 N, 78'300 W).
 * 
 * Name is what is displayed on the UI. This can be a custom string different from the ID.
 * 
 * Speech is used for the Speech-To-Text system (User to cart) to recognize different variations of pronouncing the destinations. It is
 * suggested to place different pronunciations of the name (ie convo, combo, compo), as well as different variations (ie King Hall, King, i sat).
 * You may want to run the STT system individually and run tests on how the system picks up what the user is saying.
 * 
 * Pronun is used for the Text-To-Speech system (cart to user) for how the location should be said. This is to go have a custom string other than
 * the ID for a more user friendly speech system.
 * 
 * fullMap is a boolean used for current version of our map system (Fal 2022). With different maps (small map/full map) some destinations may not
 * need to appear (or shouldn't appear due to no routes available) on the small map. If true, the destination will not appear when small map is running
 * but will appear when fullMap is ran on startup.
 * 
 * Use the template below to add more destinations. Replace anything with {} with the datatype within it. Try to place new destinations within their
 * appropriate category by area on campus.
 */
//Template
/*
  {ID}: {
    latitude: {float},
    longitude: {float},
    name: {String},       //String being displayed on UI
    speech: {[String]},   //Different names for speech system to recognize
    pronun: {String},   //Pronunciation for Text-To-Speech
    fullMap: {Boolean}, //If destination requires full map data point cloud
  },
 */

module.exports = {
  //  **********************
  //  East Campus
  //  **********************
  King: {
    latitude: 38.434373, 
    longitude: -78.864079,
    name: "King Hall",
    speech: ["King", "King Hall", "i sat"],
    pronun: "King Hall",
    fullMap: true,
  },
  UREC: {
    latitude: 38.434092, 
    longitude: -78.867430,
    name: "UREC",
    speech: ["UREC", "you wreck", "you rack", "Recreation", "Recreation Center","gym", "jim", "iraq"],
    pronun: "you wreck",
    fullMap: true,
  },
  Jennings: {
    latitude: 38.430754, 
    longitude: -78.866221,
    name: "Jennings Hall",
    speech: ["Jennings", "Jenning", "Jennings Hall", "Jenning Hall", "Paul Jenning", "Paul Jennings", "Paul Jennings Hall", "Paul Jenning Hall", "getting", "Paul getting"],
    pronun: "Jennings Hall",
    fullMap: true,
  },
  Convo: {
    latitude: 38.432975,
    longitude: -78.868568,
    name: "Convocation Center",
    speech: ["Convocation Center", "Convo", "combo", "convocation"],
    pronun: "Convocation Center",
    fullMap: true,
  },
  EnGeo: {
    latitude: 38.433859,
    longitude: -78.862175,
    name: "EnGeo",
    speech: ["home", "Engineering", "in geo", "ngl", "india", "in jail", "geology"],
    pronun: "Engineering and Geoscience Building",
    fullMap: false,
  },
  Shenandoah: {
    latitude: 38.431779,
    longitude: -78.862850,
    name: "Shenandoah Hall",
    speech: ["Shenandoah", "Shenandoah Hall", "shindo"],
    pronun: "Shenandoah Hall",
    fullMap: true,
  },
  EHall: {
    latitude: 38.431662,
    longitude: -78.860880,
    name: "E-Hall",
    speech: ["E-Hall", "he hall", "he how", "e hall"],
    pronun: "E-Hall",
    fullMap: false,
  },
  Chandler: {
    latitude: 38.432486,
    longitude: -78.860455,
    name: "Chandler Hall",
    speech: ["Chandler", "gender"],
    pronun: "Chandler Hall",
    fullMap: true,
  },
  Chesapeake: {
    latitude: 38.432428,
    longitude: -78.861864,
    name: "Chesapeake Hall",
    speech: ["Chesapeake", "Chesapeake Hall"],
    pronun: "Chesapeake Hall",
    fullMap: true,
  },
  Festival: {
    latitude: 38.433091,
    longitude: -78.859923,
    name: "Festival",
    speech: ["Festival", "festi"],
    pronun: "Festival",
    fullMap: false,
  },
  Bioscience: {
    latitude: 38.433203, 
    longitude: -78.860634,
    name: "Bio",
    speech: ["bioscience", "bioscience building", "bio"],
    pronun: "Bioscience Building",
    fullMap: false,
  },




  //  **********************
  //  Central Campus 
  //  (Anything between highway and train track (ie village))
  //  **********************
  White: {
    latitude: 38.435754, 
    longitude: -78.866869,
    name: "White Hall",
    speech: ["White", "White Hall", "whitehall"],
    pronun: "White Hall",
    fullMap: true,
  },
  Huffman: {
    latitude: 38.436351, 
    longitude: -78.869042,
    name: "Huffman Hall",
    speech: ["Huffman", "Huffman Hall", "huffman all", "kaufman"],
    pronun: "Huffman Hall",
    fullMap: true,
  },
  Village: {
    latitude: 38.436549, 
    longitude: -78.869487,
    name: "Village",
    speech: ["Village", "Village Area"],
    pronun: "Village",
    fullMap: true,
  },
  Bookstore: {
    latitude: 38.436594, 
    longitude: -78.869906,
    name: "Bookstore",
    speech: ["Bookstore", "bookstores", "books are"],
    pronun: "Bookstore",
    fullMap: true,
  },
  Showker: {
    latitude: 38.433432, 
    longitude: -78.872268,
    name: "Showker Hall",
    speech: ["Showker", "Showker Hall", "shocker hall", "shocker", "shoulder", "sugar", "show care", "show her"],
    pronun: "Showker Hall",
    fullMap: true,
  },
  Hartman: {
    latitude: 38.433014, 
    longitude: -78.872904,
    name: "Hartman Hall",
    speech: ["Hartman", "Hartman Hall", "hartman all", "harman", "harming"],
    pronun: "Hartman Hall",
    fullMap: true,
  },
  Sonner: {
    latitude: 38.432437, 
    longitude: -78.873708,
    name: "Sonner Hall",
    speech: ["Sonner", "Sonner Hall", "sooner", "sooner", "sewn or hall", "solder", "sonic"],
    pronun: "Sonner Hall",
    fullMap: true,
  },
  XLabs: {
    latitude: 38.431, 
    longitude: -78.875885,
    name: "X-Labs",
    speech: ["x labs", "eggs labs", "x laps", "eggs labs"],
    pronun: "X Labs",
    fullMap: true,
  },
  greek: {
    latitude: 38.434912,
    longitude: -78.875457,
    name: "Greek Row",
    speech: ["Greek Row", "greek"],
    pronun: "Greek Row",
    fullMap: true,
  },
  

  //  **********************
  //  Main Campus 
  //  **********************
  Alumnae: {
    latitude: 38.438880, 
    longitude: -78.87337,
    name: "Alumnae Hall",
    speech: ["alumnae", "alumnae hall", "alumni", "alumni hall", "president"],
    pronun: "Alumnae Hall",
    fullMap: true,
  },
  Taylor: {
    latitude: 38.438047, 
    longitude: -78.869728,
    name: "Taylor Hall",
    speech: ["Taylor", "Taylor Hall", "Taylor Down", "Taylor Down Under", 'taylor\'s'],
    pronun: "Taylor Hall",
    fullMap: true,
  },
  Hillside: {
    latitude: 38.438268, 
    longitude: -78.868772,
    name: "Hillside Hall",
    speech: ["Hillside", "Hillside Hall"],
    pronun: "Hillside Hall",
    fullMap: true,
  },
  Bell: {
    latitude: 38.438438, 
    longitude: -78.867709,
    name: "Bell Hall",
    speech: ["Bell", "Bell Hall", "bellhop", "belt all"],
    pronun: "Bell Hall",
    fullMap: true,
  },
  Union: {
    latitude: 38.437395, 
    longitude: -78.870402,
    name: "Madison Union",
    speech: ["Union", "Madison Union", "mass and union"],
    pronun: "Madison Union",
    fullMap: true,
  },
  DHall: {
    latitude: 38.437997, 
    longitude: -78.872434,
    name: "D-Hall",
    speech: ["D hall", "deal", "dining hall", "dee hall"],
    pronun: "D Hall",
    fullMap: true,
  },
  Dukes: {
    latitude: 38.438775, 
    longitude: -78.870387,
    name: "Dukes Dining",
    speech: ["Duke", "Duke Dining", "Dukes", "Dukes Dining"],
    pronun: "Dukes Dining",
    fullMap: true,
  },
  Carrier: {
    latitude: 38.439192, 
    longitude: -78.872364,
    name: "Carrier Library",
    speech: ["Carrier", "Carrier Library"],
    pronun: "Carrier Library",
    fullMap: true,
  },
  Wilson: {
    latitude: 38.438445,
    longitude: -78.873378,
    name: "Wilson Hall",
    speech: ["Wilson", "Wilson Hall", "wilson all"],
    pronun: "Wilson Hall",
    fullMap: true,
  },
  Quad: {
    latitude: 38.43981, 
    longitude: -78.87519,
    name: "The Quad",
    speech: ["Quad", "The Quad", "quiet"],
    pronun: "the Quad",
    fullMap: true,
  },
  Harrison: {
    latitude: 38.438734, 
    longitude: -78.874366,
    name: "Harrison Hall",
    speech: ["Harrison", "Harrison Hall", "harrison all"],
    pronun: "Harrison Hall",
    fullMap: true,
  },
  hillcrest: {
    latitude: 38.438439, 
    longitude: -78.871999,
    name: "Hillcrest House",
    speech: ["hillcrest house", "hillcrest", "honors", "honors college"],
    pronun: "Hillcrest House",
    fullMap: true,
  },
  Health: {
    latitude: 38.439817, 
    longitude: -78.870606,
    name: "Health & Behavioral Science",
    speech: ["Health", "Health and Behavioral", "montiplier"],
    pronun: "Health and Behavioral Science",
    fullMap: true,
  },
  Wampler: {
    latitude: 38.439423, 
    longitude: -78.875305,
    name: "Wampler Hall",
    speech: ["Wampler", "wham puller", "rambler", "wham polar"],
    pronun: "Wampler Hall",
    fullMap: true,
  },
  Roop: {
    latitude: 38.437697, 
    longitude: -78.874345,
    name: "Roop Hall",
    speech: ["Roop", "Roop Hall"],
    pronun: "Roop Hall",
    fullMap: true,
  },
  Service: {
    latitude: 38.438634, 
    longitude: -78.875079,
    name: "Service",
    speech: ["Service"],
    pronun: "Service",
    fullMap: true,
  },
  

  
  //  **********************
  //  Original Testing
  //  **********************
  cafe: {
    latitude: 38.433406,
    longitude: -78.86157,
    name: "Cafe",
    speech: ["Cafe"],
    pronun: "cafe",
    fullMap: false,
  },
  mall: {
    latitude: 38.432923,
    longitude: -78.860962,
    name: "Mall",
    speech: ["Mall"],
    pronun: "mall",
    fullMap: false,
  },
  movie: {
    latitude: 38.432637,
    longitude: -78.861113,
    name: "Movie",
    speech: ["Movie"],
    pronun: "movie",
    fullMap: false,
  },
  rest: {
    latitude: 38.43352,
    longitude: -78.86257,
    name: "Rest Stop",
    speech: ["rest stop", "rest"],
    pronun: "Rest Stop",
    fullMap: false,
  },
}
