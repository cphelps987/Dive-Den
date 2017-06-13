$(document).ready(function () {

    console.log('Divesite page ready');

    //var queryURL = "https://api.divesites.com/?mode=detail&siteid=17559"
    //var wikipedia = "&titles=vortex_spring"
    var diveURL = "https://cors-bcs.herokuapp.com/http://api.divesites.com/?mode=sites&lat=28.538336&lng=-81.379234&dist=1000";

    //lat: 28.538336, lng: -81.379234
    // http://api.divesites.com/?mode=sites&lat=47.6031537682643&lng=-122.336164712906&dist=25 --- example in API

    $.ajax({
        url: diveURL,
        method: "GET"
    })
        .done(function(diveresponse) {

            var diveResults = diveresponse.data;


            /*for (var i = 0; i < results.length; i++) {

                if (diveresponse.sites[i]) {

                var lat = diveresponse.sites[i].lat

                var lng = diveresponse.sites[i].lng

                }*/
         console.log(diveresponse);
         console.log(diveresponse.sites[1].name);

        }); //End .done function

}); //End Document.ready
