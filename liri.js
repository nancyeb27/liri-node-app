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
    var movieName = process.argv[3];
     if(!movieName) {
         movieName = "mr nobody";
     }
       
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json&apikey=trilogy";
        console.log(queryUrl);

    axios.get(queryUrl).then(
        function(error, response, body) {
            console.log("The movie's rating is: " + response.data.imdbRating);
            
        if (!error && response.stausCode === 200){
       
    var movieObject = JSON.parse(body);
          console.log(movieObject);

          var movieResults = 
          "-----------------------------begin----------------------------" + "\r\n"
          "Title: " + movieObject.Title+"\r\n" +
          "Year: " + movieObject.Year+"\r\n" +
          "Imdb Rating : " + movieObject.imdbRating+"\r\n" +
          "Country: " + movieObject.Country+"\r\n" +
          "Plot: "+ movieObject.Plot+"\r\n" +
          "Actors: "+ movieObject.Actors+"\r\n" +
          "Rotten Tomatoes Rating: "+ movieObject.tomatoRating+"\r\n" +
          "------------------------------end--------------------------"
          console.log(movieResults);
          log(movieResults);
        } else {
          console.log("Error  :"+ error);
          return;
         }
          
    })
    
}
        console.log("The movie's rating is: " + response.data.imdbRating);





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