const GoogleHomeNotifier = require('@shooontan/google-home-notifier');
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
 
process.argv.forEach((val) => {
    getArgs = (`${val} `);
});

spotify
  .search({ type: 'track', query: `${getArgs}` })
  .then(function(response) {
    var data = response.tracks.items[0].preview_url
    return data;
  })
  .then(function (data) { 
      console.log(data);

      (async () => {
        const notifier = GoogleHomeNotifier();
        await notifier.create();

        const mp3Url = data; 
        await notifier.play(mp3Url)
      
      })();

  })
  .catch(function(err) {
    console.log(err);
  });