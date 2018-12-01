require("dotenv").config();
var axios = require("axios");

var keys = require("./keys.js");
var spotify = require("spotify");
var fs = require("fs");

var liriArgument = process.argv[2];
var userCommand = process.argv[3];

switch (liriArgument) {
    case "concert-this": concertThis(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;

}
// functions
function concertThis() {
            
    var queryUrl = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=anythingfortheappidwillwork";
    axios.get(queryUrl).then(function(data) {
             console.log(data);
    var bands = JSON.parse(data.artistdata.name);
        for (var i = 0; i < bands.length; i++){
        }

        console.log("Venue name " + bands.venue.name);
        console.log("Venue location " + bands.venue.city);
        console.log("Date of Event " +  moment(bands.datetime).format("MM/DD/YYYY"));
        
        
}
);


function spotifyThisSong() {
    spotify = new Spotify(keys.spotify);
    keys.spotifyKeys.search({ type: 'track', query: userCommand }, function (err, data) {

        if(!bands) {
            bands = "The Sign by Ace of Base" ;
    }
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0]);
        console.log("this");

        console.log(data.artists.name); 
        console.log(data.name);
        console.log(data.preview_url);


        if(!bands) {
            bands = "The Sign by Ace of Base" ;
    }


    });
    
    console.log("this");
}
};

function movieThis() {
    var movieName = userCommand;
   
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json&apikey=trilogy";
        console.log(queryUrl);

    axios.get(queryUrl).then(
        function(response) {
            console.log("The movie's rating is: " + response.data.imdbRating);
            
        var movieObject = response.data;
          console.log(response.data);
            
          var movieResults = 
          "-----------------------------begin----------------------------" + "\r\n" +
          "Title: " + movieObject.Title+"\r\n" +
          "Year: " + movieObject.Year+"\r\n" +
          "Imdb Rating : " + movieObject.imdbRating+"\r\n" +
          "Rotten Tomatoes Rating: "+ movieObject.tomatoRating+"\r\n" +
          "Country: " + movieObject.Country+"\r\n" +
          "Language" + movieObject.Language+"\r\n" +
          "Plot: "+ movieObject.Plot+"\r\n" +
          "Actors: "+ movieObject.Actors+"\r\n" +
          "------------------------------end--------------------------"
          console.log(movieResults);

          //   if(movieObject==="undefined") {
        //     movieResults = "mr nobody";
        //     console.log("If you haven't watched 'Mr.Nobody', then you should: http://www.imdb.com/title/tt0485947/");
        //     console.log("It's on Netfilx!");
        // }
     
    })
    .catch(function (error) {
        console.log(error);
});
   
    function doWhatItSays() {
        fs.readFile("random.txt", "utf8", function(error, data)  {
        })
    }
     
        // console.log("You selected: do-what-it-says - Sorry this section is not active at this time.")      })
};