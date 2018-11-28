require("dotenv").config();

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
    console.log("this");
}

function doWhatItSays() {

}