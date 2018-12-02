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
    case "concert-this": concertThis(); break;
    case "spotify-this-song": 
    if (userCommand === "") {
        userCommand = "The Sign (Ace of Base)";
        spotifyThisSong(); break;
    }
    case "movie-this": 
    if (userCommand === "") {
        userCommand = "Mr Nobody";
        movieThis(); break;
    }
    case "do-what-it-says": doWhatItSays(); break;

};
// functions
function concertThis() {
     var artists = userCommand;    
    var queryUrl = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=anythingfortheappidwillwork";
    axios.get(queryUrl).then(function(response) {
     var bandData = response.data;
      console.log(response.data);

    var bands = [
        "Venue name " + bandData.venue.name,
        "Venue location " + bandData.venue.city,
        "Date of Event " +  moment(bandData.venue.datetime).format("MM/DD/YYYY"),
        ].join("\n\n");

    fs.appendFile("log.txt", bands + divider, function (err) {
        if (err) throw err;
        console.log(bands);
      })
})
};




function spotifyThisSong() {
   spotify.search({ type: 'track', query: userCommand }, function (err, data) {
        console.log(userCommand);
  
       var data = data.tracks.items[0];
        console.log(data.artists);
       console.log("------Aritist---------------");
       for (i=0; i < data.artists.length; i++) {
           for (var i = 0; i < 5; i++){
               if (data[i] != undefined){
                   var spotifyResults = 
                   "Artist: " + data.artists.name + "\r\n" +
                   "Song: " + data.name + "\r\n" +
                   "Preview Url: " + data.preview_url + "\r\n" +
                   "----------------" + "end" + "------------------" + "\r\n";
                   console.log(spotifyResults);
                   log(spotifyResults);

                   if (err) {
                    console.log('Error occurred: ' + err);
                    return; 
               }
           }
        
       };
 };
   });
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
   
        
        if (err) {
            console.log('Error occurred: ' + err);
            return; 
        }
     
    })
    .catch(function (error) {
        console.log(error);
});
};
;

    function doWhatItSays() {
        fs.readFile("random.txt", "utf8", function(error, data)  {
            if (!error) {
                dowWhatItSaysResults = data.split(",");
                spotifyThisSong();
             } else {
                 console.log("Error occurred" + error);
             
             console.log("You selected: do-what-it-says - Sorry this section is not active at this time.");      
             }
   });
     
    }

