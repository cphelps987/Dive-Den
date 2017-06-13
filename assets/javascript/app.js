//-----------------------------------------DIVE SITES---------------------------------------------------------
//console.log('Divesite page ready');

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
        zoom  : 8
    });
    infowindow = new google.maps.InfoWindow();

}

function createMarker(lat, lng, site) {
    // console.log('CreateMarker', lat, lng, site);
    var marker = new google.maps.Marker({
        map     : map,
        position: {lat: lat, lng: lng},
        title   : site
    });


    var markerIt = "";
    var markerLocation = "";

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(site);
        infowindow.open(map, this);
        markerIt = this;
        //console.log(marker.title);
        //console.log(typeof (marker.title));
        markerLocation = lat + " , " + lng;
        //console.log("current location " + markerLocation);
        //console.log("lat " + lat);
        //console.log("lng " + lng);
        //console.log("site " + site);

/*

        var doc_ajax_url = "http://better-studio.net/plugins/better-weather/better-weather/ajax/ajax.php";



        $('#weather-7').betterWeather({
            apiKey       : "1208888c1e4c797e28a237b4c0888f7b",
            style        : "modern",
            nextDays     : false ,
            bgColor      : '#333',
            location     : markerLocation,
            unit         : "F" ,// F
            locationName : site,
            animatedIcons: true,
            url          : doc_ajax_url
        });

        // Hack for element query on local/cross domain
        elementQuery({".better-weather": {"max-width": ["2000px", "1170px", "970px", "830px", "650px", "550px", "400px", "300px", "170px", "100px", "50px"]}});

*/


        //wiki start
        var wikiSearch = marker.title;
        var wikiURL = "https://en.wikipedia.org/w/api.php";


        var params = {
            "action"    : "query",
            "format"    : "json",
            "prop"      : "links|images|extlinks|imageinfo|info|url|extracts",
            "iiprop"    : "timestamp|user|url|comment",
            "meta"      : "url",
            "origin"    : "*",
            "iwurl"     : 1,
            "titles"    : wikiSearch,
            "redirects" : 1,
            "exintro"   : true,
            "inprop"    : "url"

        };

        //console.log("parm title " + params.titles);


        wikiURL += "?" + $.param(params);
        $.ajax({
            url   : wikiURL,
            method: "GET"
        })
            .done(function (response) {
               //console.log('wikiURL response', response);


                var objResult = response;

                // console.log(objResult);
                if (! response.query.pages["-1"]){

                    $.each(response.query.pages, function (c) { //this is showing an error please beware and fix
                        var wikiPages = response.query.pages[c].extract; //please change var name to be more specific
                        $("#wikip").html(wikiPages);
                    }); //End .each
                } else {
                   $("#wikip").html("No Content for " + site);
                    //console.log("no results for wiki");
                    }
            }); //End .done //end of wiki

        //flickr

        $.getJSON("https://cors-bcs.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?tags="+ marker.title + ", scuba&format=json&nojsoncallback=1", function (data) {
            //console.log('Flickr Data', data);
            if(data.items.length > 0) {
                $.each(data.items, function (i, item) {
                    $("<img>").attr("src", item.media.m).prependTo("#flickrImg")
                });
            } else {
                $("<img>").attr("src", "assets/images/defaultScuba.jpg").prependTo("#flickrImg");
               // console.log("no results image for flickr");
            }
        });//end of flickr
    });
}



//-----------------------------------------WIKIPEDIA---------------------------------------------------------


 //console.log('wiki ready');




//-----------------------------------------FLICKR---------------------------------------------------------

//console.log("flickr ready!");


//-----------------------------------------SEARCHBOX---------------------------------------------------------


    var a = document.getElementById('newsearch');
    a.addEventListener('submit',function(e) {
        e.preventDefault();
        var b = document.getElementById('gttextinput').value;
        window.location.href = 'https://cphelps987.github.io/Project1/'+b;

    });


//-----------------------------------------USER INPUT---------------------------------------------------------

function validateForm() {
    var x = document.forms["myForm"]["email"].value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        console.log("Not a valid e-mail address");
        return false;
    } else {
        window.localStorage.setItem('email', x);
    }
}


//-----------------------------------------SEARCHBOX---------------------------------------------------------


/*document.getElementById('frmSearch').onsubmit = function() {
    window.location = 'http://www.google.com/search?q=' + document.getElementById('txtSearch').value;
    return false;
}
*/


