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
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;

}
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
       if(!userCommand) {
           userCommand= "The Sign by Ace of Base" ;
   }
       if (err) {
           console.log('Error occurred: ' + err);
           return;
       }
       var data = data.tracks.items[0];
       console.log("------Aritist---------------");
       for (i=0; i < data.artists.length; i++) {
       console.log(data.tracks.items[0]);
       console.log("this");

       console.log(data.artists.name);
       console.log(data.name);
       console.log(data.preview_url);

       }
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

         
        if(!userCommand) {
            userCommand = "Mr. Nobody" ;
            console.log("If you haven't watched 'Mr.Nobody', then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netfilx!");
    }
        if (err) {
            console.log('Error occurred: ' + err);
            return; 
        }
     
    })
    .catch(function (error) {
        console.log(error);
});
};
   
    function doWhatItSays() {
        fs.readFile("random.txt", "utf8", function(error, data)  {
        })
   
     
        console.log("You selected: do-what-it-says - Sorry this section is not active at this time.")      
    }