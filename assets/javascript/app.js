
//-----------------------------------------DIVE SITES---------------------------------------------------------


console.log('Divesite page ready');

var diveURL = "https://cors-bcs.herokuapp.com/http://api.divesites.com/?mode=sites&lat=28.538336&lng=-81.379234&dist=1000";

//lat: 28.538336, lng: -81.379234

var lat = "";
var lng = "";
var site = "";


$.ajax({
    url: diveURL,
    method: "GET"
}).done(function (response) {

    // console.log(response)

    for (var i = 0; i < 1700; i++) {



        lat = parseFloat(response.sites[i].lat);
        lng = parseFloat(response.sites[i].lng);
        site = response.sites[i].name;

        createMarker(lat, lng, site)
    }

}); //End .done

// console.log('results', response.sites[1].lat);
// console.log(typeof(response.sites[1].lat) )
// console.log(typeof(parseFloat(response.sites[1].lat)))
// console.log(typeof(response.sites[i].name));
//  console.log(response.sites[i]);

//-----------------------------------------GOOGLE MAPS---------------------------------------------------------


var map;
var infowindow;

function initMap() {
    var florida = {lat: 28.538336, lng: -81.379234};
    map = new google.maps.Map(document.getElementById('map'), {
        center: florida,
        zoom: 8
    });
    infowindow = new google.maps.InfoWindow();

}


function createMarker(lat, lng, site) {
    // console.log('CreateMarker', lat, lng, site);
    var marker = new google.maps.Marker({
        map: map,
        position: {lat: lat, lng: lng},
        title: site
    });


    var markerIt = "";

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(site);
        infowindow.open(map, this);
        markerIt = this;
        console.log(marker.title);
        //console.log(typeof (marker.title));

        $.getJSON("https://cors-bcs.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?tags="+ marker.title + ", scuba&format=json&nojsoncallback=1", function (data) {
            console.log(data);

            $.each(data.items, function (i, item) {
                $("<img>").attr("src", item.media.m).prependTo("#flickrImg")

            });


        });

    });
}




//-----------------------------------------WIKIPEDIA---------------------------------------------------------


/*
 console.log('wiki ready');



 var wikiSearch = site;
 var wikiURL = "https://en.wikipedia.org/w/api.php";


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


 wikiURL += "?" + $.param(params);
 $.ajax({
 url: wikiURL,
 method: "GET"
 })
 .done(function (response) {
 console.log('response', response);


 var objResult = response

 // console.log(objResult);

 /!*  $.each(response.query.pages, function (c) { //this is showing an error please beware and fix

 var hey = response.query.pages[c].extract; //please change var name to be more specific*!/

 $("#wikip").html(hey);

 }); //End .each

 }); //End .done*/

//-----------------------------------------FLICKR---------------------------------------------------------

console.log("flickr ready!");


//site = response.sites[i].name;



/*$.getJSON("https://cors-bcs.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?tags=florida,scuba&format=json&nojsoncallback=1", function (data) {
 //  console.log(data)
 $.each(data.items, function (i, item) {
 $("<img>").attr("src", item.media.m).appendTo("#flickrImg")


 $.getJSON("https://cors-bcs.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?tags=florida,scuba&format=json&nojsoncallback=1", function (data) {
 console.log(data)
 $.each(data.items, function (i, item) {
 $("<img>").attr("src", item.media.m).appendTo("#flickrImg")
 });

 });


 });

 });*/




//-----------------------------------------WEATHER---------------------------------------------------------


var APIKey = "166a433c57516f51dfab1f7edaed8413";

var weatherURL = "http://api.openweathermap.org/data/2.5/weather?" +
    "q=Orlando,ORL&units=imperial&appid=" + APIKey;

$.ajax({
    url: weatherURL,
    method: "GET"
}).done(function (response) {
    /*console.log(weatherURL);
     console.log(response);
     */
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").html("Wind Speed: " + response.wind.speed);
    $(".humidity").html("Humidity: " + response.main.humidity);
    $(".mainTemp").html("Temperature (F) " + response.main.temp);
    $(".minTemp").html("Min. Temperature: " + response.main.temp_min);
    $(".maxTemp").html("Max Temperature: " + response.main.temp_max);

    /*   console.log("Wind Speed: " + response.wind.speed);
     console.log("Humidity: " + response.main.humidity);
     console.log("Temperature (F) " + response.main.temp);
     console.log("Min. Temperature: " + response.main.temp_min);
     console.log("Max Temperature: " + response.main.temp_max);*/
});

//-----------------------------------------SLIDESHOW---------------------------------------------------------


/*var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}
*/