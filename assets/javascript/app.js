$(document).ready(function () {

console.log('ready1!');

  //var queryURL = "https://api.divesites.com/?mode=detail&siteid=17559"
  //var wikipedia = "&titles=vortex_spring"
  var queryURL = "https://en.wikipedia.org/w/api.php?action=query&titles=vortex_spring&prop=revisions&rvprop=content&format=json&origin=*&gsrsearch=q";
  // 28.5383° N, 81.3792° W
  // http://api.divesites.com/?mode=sites&lat=47.6031537682643&lng=-122.336164712906&dist=25https://en.wikipedia.org/w/api.php?action=query&titles=blue+whale&prop=revisions&rvprop=content&format=json&origin=*&gsrsearch=q

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    console.log('response', response);
    console.log('ready2!');
   
      }); //End .done function

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