console.log('this is loaded');

var Spotify = require('node-spotify-api');
    
    var spotifyKeys = new Spotify({
      id: "4befdabd531e439399a3dc9c0e9b9241",
      secret: "d240e3a1003f4e24b4d2add82d83967d",
      
    });
   
module.exports = {
    "spotifyKeys":spotifyKeys
}

// ombd api = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// book this band api = 

// try using this url param: `?app_id=anythingfortheappidwillwork`