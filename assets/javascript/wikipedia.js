$(document).ready(function ($) {

console.log('ready1!');

  var wikiSearch = "Blue Spring State Park";
  var queryURL = "https://en.wikipedia.org/w/api.php";

var params = {
  "action": "query",
  "format": "json",
  "prop": "links|images|extlinks|imageinfo|info|url|extracts",
  "iiprop": "timestamp|user|url|comment",
  "meta": "url",
  "origin": "*",
  "iwurl": 1,
  "titles": wikiSearch,
  "redirects": 1,
  "inprop": "url"

};

  queryURL += "?" + $.param(params);
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    console.log('ready2!');
    console.log('response', response);

    var objResult = response
    
    console.log(objResult);
    
    $.each(response.query.pages, function(c) {
            
      var hey = response.query.pages[c].extract;
            
      $("#wikipediaImages").html(hey);
     
    }); //End .each
  
  }); //End .done

}); //End Document.ready

