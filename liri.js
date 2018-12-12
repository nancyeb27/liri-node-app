require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var liriArgument = process.argv[2];
var userCommand = process.argv[3];


switch (liriArgument) {
    case "concert-this": concertThis(userCommand); break;
    case "spotify-this-song": spotifyThisSong(userCommand); break;
    case "movie-this": movieThis(userCommand); break;
    case "do-what-it-says": doWhatItSays(userCommand); break;

};
// functions
function concertThis(artists) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=anythingfortheappidwillwork";
    // console.log(queryUrl)

    axios.get(queryUrl).then(function (response) {
        var results = response.data;
         console.log(response.data);

        for (var i = 0; i < response.data.length; i++) {

            console.log(`Venue name: ${results[i].venue.name}`);
            console.log(`Venue location: ${results[i].venue.city}`);
            console.log(`Date of Event:${moment(results[i].datetime).format("MM/DD/YYYY")}\n`);

            fs.appendFile("log.txt", artists, function (err) {
                if (err) throw err;
            })
        }
    })
};


function spotifyThisSong(userCommand) {
    // console.log(userCommand);
    if (userCommand === undefined) {
        userCommand = "The Sign (Ace of Base)";
    }

    spotify.search({ type: 'track', query: userCommand }, function (err, data) {

        var data = data.tracks.items[0];
        // console.log(data);
        for (i = 0; i < data.artists.length; i++) {
            console.log("------Aritist---------------");
            console.log(`Artist: ${data.artists[i].name + "\r\n"}`);
            console.log(`Song: ${data.name + "\r\n"}`);
            console.log(`Preview Url: ${data.preview_url + "\r\n"}`);
            console.log(`Album Name:  ${data.album.name + "\r\n"}`);
            console.log("----------------" + "end" + "------------------" + "\r\n");

            if (err) {
                console.log('Error occurred: ' + err);
                return;

            }
        }
    })
}


function movieThis(userCommand) {
    var movieName = userCommand;
    if (userCommand === undefined) {
        userCommand = "Mr Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + userCommand + "&y=&plot=short&tomatoes=true&r=json&apikey=trilogy";
    console.log(queryUrl);


    axios.get(queryUrl).then(
        function (response) {

            var movieObject = response.data;
            // console.log(response.data);

            var movieResults =
                "-----------------------------begin----------------------------" + "\r\n" +
                "Title: " + movieObject.Title + "\r\n" +
                "Year: " + movieObject.Year + "\r\n" +
                "Imdb Rating : " + movieObject.imdbRating + "\r\n" +
                "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n" +
                "Country: " + movieObject.Country + "\r\n" +
                "Language" + movieObject.Language + "\r\n" +
                "Plot: " + movieObject.Plot + "\r\n" +
                "Actors: " + movieObject.Actors + "\r\n" +
                "------------------------------end--------------------------"
            console.log(movieResults);

        })
        .catch(function (error) {
            console.log(error);
        });

}


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("Error occurred" + error);
        }

        var dataArr = data.split(",");

        if (dataArr.length === 2) {


            var command = dataArr[0];
            var userCommand = dataArr[1];
            // console.log(userCommand)
               switch (command) {
                case "concert-this": concertThis(); break;
                case "spotify-this-song": spotifyThisSong(); break;
                case "movie-this": movieThis(); break;
            };;
        }
    });


}
