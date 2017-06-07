$(document).ready(function () {

console.log('ready1!');

function queryDive() {
  //var queryURL = "https://api.divesites.com/?mode=detail&siteid=17559"
  var queryURL = "https://api.divesites.com/?mode=sites&lat=28.5383&lng=81.3792=25";
  // 28.5383° N, 81.3792° W
  // http://api.divesites.com/?mode=sites&lat=47.6031537682643&lng=-122.336164712906&dist=25

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    console.log(response.request.loc.area_code);
    console.log('ready2!)');
   
      }); //End .done function

}; //End function queryDive

}); //End Document.ready







/* for referencing multiple apis  
        $.ajaxSetup({
//      async: false
    })
    //Google
    $.ajax({
      url: "https:maps.googleapis.com/maps/api/js?key=&callback=initMap",
      method: "GET"
    }).done(function(response) {
      console.log(response);
    });
    //Amazon
    $.ajax({
      url: "",
      method: "GET"
    }).done(function(response) {
      console.log(response);
    });
    //Fish 
    $.ajax({
      url: "",
      method: "GET"
    }).done(function(response) {
      console.log(response);
    });
    //NP and Active Campsite
    $.ajax({
      url: "",
      method: "GET"
    }).done(function(response) {
      console.log(response);
    });
// ---------------------------------------------------------

    console.log("Because our AJAX requests are asynchronous, this line of code will most likely log first");
})
    console.log("ready!");
*/