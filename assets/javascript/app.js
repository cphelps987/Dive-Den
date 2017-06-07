$(document).ready(function () {
//HEAD
  console.log("ready!");
  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

console.log('ready2');

function queryDive() {
  var queryURL = "http://api.divesites.com/?mode=detail&siteid=17559"

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    console.log(queryURL);
    console.log(result);
    console.log(response.sites.name);
   
      }); //End .done function

  queryDive();

  }; //End queryDive

  queryDive();

}); //End Document.ready







/*    $.ajaxSetup({
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
})*/
/*=======

    console.log("ready!");


>>>>>>> d351b4f38907841195dd568a2a0230b9115dc098
*/