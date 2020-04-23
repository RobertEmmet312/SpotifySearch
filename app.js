// document.addEventListener("DOMContentLoaded", function(){
//     var 

// //this is extracting the access token from the url
// var tokenRegex = /#access_token=(.+)&token_type=.+&expires_in=.+/;
// var tokenMatches = window.location.hash.match(tokenRogex); 
// var accessToken = tokenMatches[1];

// // error handeling 
// //var accessToke
// // if (tokenMatches){
// //   accessToken = tokenMatches[1]; 
// //}
// }

// .document
// .getElementById("searchForm")
// .addEventListener("submit", function(event){
//     event.preventDefault();

//     var songSearch = document.querySelector('input[name='search']).value; 
//     //console.log("song search form ");

// })


document.addEventListener("DOMContentLoaded", function() {

    var songContainer = document.getElementById("song-container");
  
    function createTrackHtml(trackObj) {
      var artists = [];
  
      trackObj.artists.forEach(function(artist) {
        artists.push(artist.name);
      });
  
      return `
        <!--One Song-->
        <div class="row margin-top-20 one-song">
          <div class="col-sm-3">
            <img src="${trackObj.album.images[1].url}" class="img-responsive" />
          </div>
          <div class="col-sm-9">
            <h2>${trackObj.name}</h2>
            <p>
              By ${artists.join(", ")}
            </p>
            <p>
              Album: ${trackObj.album.name}
            </p>
            <div class="margin-top-20">
              <audio controls>
                <source src="${trackObj.preview_url}" type="audio/mpeg">
              </audio>
            </div>
            <div class="margin-top-20">
              <button type="submit" class="btn btn-success btn-sm">
                <span class="glyphicon glyphicon-ok margin-right-5"></span>
                Save Track
              </button>
            </div>
          </div>
        </div>
        <!--/One Song-->
      `;
    }
    
    var tokenRegex = /#access_token=(.+)&token_type=.+&expires_in=.+/;
  
    var tokenMatches = window.location.hash.match(tokenRegex);
  
    var accessToken;

    // this is for "error handling". the return will not always give something in the [1] spot. so this is to ensure that it will only work if the token is present
    if (tokenMatches) {
      accessToken = tokenMatches[1];
    }
  
    // If there is no access token, disable search functionality
    if (!accessToken) {
      document
      .querySelector("input[name='search']")
      .setAttribute("disabled", "disabled");
  
      document
      .getElementById("submitBtn")
      .setAttribute("disabled", "disabled");

      //put in an alert to log in!

    }
    
    //this will listen to the search form for the submit event
    document
    .getElementById("search-form")
    .addEventListener("submit", function(event) {
      event.preventDefault();
  
      var songSearchQuery = document
      .querySelector("input[name='search']")
      .value;
  
      axios 
      .get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songSearchQuery)}&type=track`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      })
      .then(function(response) {
        var trackItems = response.data.tracks.items;
  
        // Step 1: Loop through "items"
        // Step 2: For every item, create a new block of HTML with the data inside
        // Step 3: Append newly-created HTML to the DOM
  
        trackItems.forEach(function(trackItem) {
          var trackHtml = createTrackHtml(trackItem);
  
          // Append new HTML to the DOM
          songContainer.innerHTML += trackHtml;
        });
      })
      .catch(function() {
        // Show a notice on the UI for this issue. 
        console.log("Cannot get track data from Spotify");
      });
    });
  
  });







});
//no more