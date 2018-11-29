require("dotenv").config();
var axios = require("axios");

var keys = require("./keys.js");

var liriArgument = process.argv[2];
var userCommand = process.argv[3];

switch (liriArgument) {
    case "concert-this": concertThis(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;

}
// functions
function movieThis() {
    var movie = process.argv[3];
    if(!movie) {
        movie = "mr nobody";
    }
        params = movie
        
        axios.get("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);
}

function spotifyThisSong() {
    keys.spotifyKeys.search({ type: 'track', query: userCommand }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);

        }
        console.log(data.tracks.items[0]);
        console.log("this");
        console.log(data.tracks.items[0].artists[0].name); 
    });
}

function concertThis() {
    var band = process.argv[4];
    if(!band) {
        band = "The Sign";
    }
        params = band
        
        axios.get("https://rest.bandsintown.com/artists/" + params + "/events?app_id=anythingfortheappidwillwork").then(
            function (response) {
    console.log("The name of the artist is: ",response);
  }
  
);


    console.log("this");
}

function doWhatItSays() {

}