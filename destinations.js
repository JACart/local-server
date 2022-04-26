module.exports = {
//Template
/*
  {ID}: {
    latitude: {lat},
    longitude: {long},
    name: {name},       //String being displayed on UI
    speech: {[x,y,z]},   //Different names for speech system to recognize
    pronun: {string},   //Pronunciation for Text-To-Speech
  },
*/

  //East Campus
  King: {
    latitude: 38.434376, 
    longitude: -78.864105,
    name: "King Hall",
    speech: ["King", "King Hall", "i sat"],
    pronun: "King Hall",
  },
  UREC: {
    latitude: 38.433973, 
    longitude: -78.867666,
    name: "UREC",
    speech: ["UREC", "you wreck", "you rack", "Recreation", "Recreation Center","gym", "jim", "iraq"],
    pronun: "you wreck",
  },
  Jennings: {
    latitude: 38.430663, 
    longitude: -78.866104,
    name: "Jennings Hall",
    speech: ["Jennings", "Jenning", "Jennings Hall", "Jenning Hall", "Paul Jenning", "Paul Jennings", "Paul Jennings Hall", "Paul Jenning Hall", "getting", "Paul getting"],
    pronun: "Jennings Hall",
  },
  Convo: {
    latitude: 38.432885,
    longitude: -78.868613,
    name: "Convocation Center",
    speech: ["Convocation Center", "Convo", "combo", "convocation"],
    pronun: "Convocation Center",
  },
  EnGeo: {
    latitude: 38.433859,
    longitude: -78.862175,
    name: "EnGeo",
    speech: ["home", "Engineering", "in geo", "ngl", "india", "in jail", "geology"],
    pronun: "Engineering and Geoscience Building",
  },
  Shenandoah: {
    latitude: 38.431766,
    longitude: -78.862851,
    name: "Shenandoah Hall",
    speech: ["Shenandoah", "Shenandoah Hall", "shindo"],
    pronun: "Shenandoah Hall",
  },
  EHall: {
    latitude: 38.431662,
    longitude: -78.860880,
    name: "E-Hall",
    speech: ["E-Hall", "he hall", "he how", "e hall"],
    pronun: "E-Hall",
  },
  Chandler: {
    latitude: 38.432486,
    longitude: -78.860455,
    name: "Chandler Hall",
    speech: ["Chandler", "gender"],
    pronun: "Chandler Hall",
  },
  Chesapeake: {
    latitude: 38.432428,
    longitude: -78.861864,
    name: "Chesapeake Hall",
    speech: ["Chesapeake", "Chesapeake Hall"],
    pronun: "Chesapeake Hall",
  },
  Festival: {
    latitude: 38.433091,
    longitude: -78.859923,
    name: "Festival",
    speech: ["Festival", "festi"],
    pronun: "Festival",
  },
  Bioscience: {
    latitude: 38.433203, 
    longitude: -78.860634,
    name: "Bio",
    speech: ["bioscience", "bioscience building", "bio"],
    pronun: "Bioscience Building",
  },



  //Central Campus (Anything between highway and train track (ie village))
  White: {
    latitude: 38.435938, 
    longitude: -78.866804,
    name: "White Hall",
    speech: ["White", "White Hall", "whitehall"],
    pronun: "White Hall",
  },
  Huffman: {
    latitude: 38.436312, 
    longitude: -78.869054,
    name: "Huffman Hall",
    speech: ["Huffman", "Huffman Hall", "huffman all", "kaufman"],
    pronun: "Huffman Hall",
  },
  Village: {
    latitude: 38.436514, 
    longitude: -78.869590,
    name: "Village",
    speech: ["Village", "Village Area"],
    pronun: "Village",
  },
  Bookstore: {
    latitude: 38.436154, 
    longitude: -78.870122,
    name: "Bookstore",
    speech: ["Bookstore", "bookstores", "books are"],
    pronun: "Bookstore",
  },
  Showker: {
    latitude: 38.433298, 
    longitude: -78.872345,
    name: "Showker Hall",
    speech: ["Showker", "Showker Hall", "shocker hall", "shocker", "shoulder", "sugar", "show care", "show her"],
    pronun: "Showker Hall",
  },
  Hartman: {
    latitude: 38.432691, 
    longitude: -78.873119,
    name: "Hartman Hall",
    speech: ["Hartman", "Hartman Hall", "hartman all", "harman", "harming"],
    pronun: "Hartman Hall",
  },
  Sonner: {
    latitude: 38.432306, 
    longitude: -78.873984,
    name: "Sonner Hall",
    speech: ["Sonner", "Sonner Hall", "sooner", "sooner", "sewn or hall", "solder", "sonic"],
    pronun: "Sonner Hall",
  },
  XLabs: {
    latitude: 38.431618, 
    longitude: -78.875885,
    name: "X-Labs",
    speech: ["x labs", "eggs labs", "x laps", "eggs labs"],
    pronun: "X Labs",
  },
  greek: {
    latitude: 38.434647,
    longitude: -78.875531,
    name: "Greek Row",
    speech: ["Greek Row", "greek"],
    pronun: "Greek Row",
  },
  

  //Main Campus
  Alumnae: {
    latitude: 38.438713, 
    longitude: -78.873478,
    name: "Alumnae Hall",
    speech: ["alumnae", "alumnae hall", "alumni", "alumni hall", "president"],
    pronun: "Alumnae Hall",
  },
  Taylor: {
    latitude: 38.437972, 
    longitude: -78.869804,
    name: "Taylor Hall",
    speech: ["Taylor", "Taylor Hall", "Taylor Down", "Taylor Down Under", 'taylor\'s'],
    pronun: "Taylor Hall",
  },
  Hillside: {
    latitude: 38.438206, 
    longitude: -78.868895,
    name: "Hillside Hall",
    speech: ["Hillside", "Hillside Hall"],
    pronun: "Hillside Hall",
  },
  Bell: {
    latitude: 38.438533, 
    longitude: -78.867833,
    name: "Bell Hall",
    speech: ["Bell", "Bell Hall", "bellhop", "belt all"],
    pronun: "Bell Hall",
  },
  Union: {
    latitude: 38.437395, 
    longitude: -78.870531,
    name: "Madison Union",
    speech: ["Union", "Madison Union", "mass and union"],
    pronun: "Madison Union",
  },
  DHall: {
    latitude: 38.437526, 
    longitude: -78.871589,
    name: "D-Hall",
    speech: ["D hall", "deal", "dining hall", "dee hall"],
    pronun: "D Hall",
  },
  Dukes: {
    latitude: 38.438764, 
    longitude: -78.870600,
    name: "Dukes Dining",
    speech: ["Duke", "Duke Dining", "Dukes", "Dukes Dining"],
    pronun: "Dukes Dining",
  },
  Carrier: {
    latitude: 38.439054, 
    longitude: -78.872503,
    name: "Carrier Library",
    speech: ["Carrier", "Carrier Library"],
    pronun: "Carrier Library",
  },
  Wilson: {
    latitude: 38.438261,
    longitude: -78.873425,
    name: "Wilson Hall",
    speech: ["Wilson", "Wilson Hall", "wilson all"],
    pronun: "Wilson Hall",
  },
  Quad: {
    latitude: 38.439277, 
    longitude: -78.874921,
    name: "The Quad",
    speech: ["Quad", "The Quad", "quiet"],
    pronun: "the Quad",
  },
  Harrison: {
    latitude: 38.438527, 
    longitude: -78.874467,
    name: "Harrison Hall",
    speech: ["Harrison", "Harrison Hall", "harrison all"],
    pronun: "Harrison Hall",
  },
  hillcrest: {
    latitude: 38.438257, 
    longitude: -78.872069,
    name: "Hillcrest House",
    speech: ["hillcrest house", "hillcrest", "honors", "honors college"],
    pronun: "Hillcrest House",
  },
  Health: {
    latitude: 38.439817, 
    longitude: -78.870606,
    name: "Health & Behavioral Science",
    speech: ["Health", "Health and Behavioral", "montiplier"],
    pronun: "Health and Behavioral Science",
  },
  Wampler: {
    latitude: 38.439186, 
    longitude: -78.875463,
    name: "Wampler Hall",
    speech: ["Wampler", "wham puller", "rambler", "wham polar"],
    pronun: "Wampler Hall",
  },
  
/*
  //Original Testing
  home: {
    latitude: 38.433859,
    longitude: -78.862175,
    name: "Home",
    speech: ["Home"],
    pronun: "home",
  },
  */
  cafe: {
    latitude: 38.433406,
    longitude: -78.86157,
    name: "Cafe",
    speech: ["Cafe"],
    pronun: "cafe",
  },
  // clinic: {
  //   latitude: 38.433125,
  //   longitude: -78.860713,
  //   name: "Clinic",
  //   speech: ["Clinic"],
  //   pronun: "clinic",
  // },
  mall: {
    latitude: 38.432923,
    longitude: -78.860962,
    name: "Mall",
    speech: ["Mall"],
    pronun: "mall",
  },
  movie: {
    latitude: 38.432637,
    longitude: -78.861113,
    name: "Movie",
    speech: ["Movie"],
    pronun: "movie",
  },
/*
  diner: {
    latitude: 38.431662,
    longitude: -78.860880,
    name: "Diner",
    speech: [""],
    pronun: "diner",
  },
  festival: {
    latitude: 38.433019,
    longitude: -78.859893,
    name: "Festival",
    speech: ["festival", "festi"],
    pronun: "festival",
  },
*/
  rest: {
    latitude: 38.43352,
    longitude: -78.86257,
    name: "Rest Stop",
    speech: ["rest stop", "rest"],
    pronun: "Rest Stop",
  },
/*
  chesapeake: {
    latitude: 38.43299,
    longitude: -78.86240,
    name: "Chesapeake",
    speech: ["chesapeake"],
    pronun: "chesapeake",
  }
*/
}
