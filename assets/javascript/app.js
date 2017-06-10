
//-----------------------------------------DIVE SITES---------------------------------------------------------


    console.log('Divesite page ready');

    //var queryURL = "https://api.divesites.com/?mode=detail&siteid=17559"
    //var wikipedia = "&titles=vortex_spring"
    var diveURL = "https://cors-bcs.herokuapp.com/http://api.divesites.com/?mode=sites&lat=28.538336&lng=-81.379234&dist=1000";

    //lat: 28.538336, lng: -81.379234
    // http://api.divesites.com/?mode=sites&lat=47.6031537682643&lng=-122.336164712906&dist=25 --- example in API
    var lat = "";
    var lng = "";
    var site = "";


    $.ajax({
        url: diveURL,
        method: "GET"
    }).done(function (response) {

           // console.log(response)

            for (var i = 0; i < 1700; i++) {

              //  console.log(response.sites[i]);

                lat = parseFloat(response.sites[i].lat);
                lng = parseFloat(response.sites[i].lng);
                site = response.sites[i].name;

                createMarker(lat, lng, site)
            }

            console.log('ready1!');

    var wikiSearch = site;
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
        .done(function (response) {
            console.log('ready2!');
            console.log('response', response);

            var objResult = response

            console.log(objResult);

            $.each(response.query.pages, function (c) {

                var hey = response.query.pages[c].extract;

                $("#wikip").html(hey);

            }); //End .each

        }); //End .done




            // console.log('results', response.sites[1].lat);
            // console.log(typeof(response.sites[1].lat) )
            // console.log(typeof(parseInt(response.sites[1].lat)))
        console.log(typeof )


        }); //End .done function

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
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(site);
            infowindow.open(map, this);
        });
    };




//-----------------------------------------WIKIPEDIA---------------------------------------------------------



    console.log('wiki ready');


    var wikiSearch = site;
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
        .done(function (response) {
            console.log('response', response);

            var objResult = response

            console.log(objResult);

            $.each(response.query.pages, function (c) {

                var hey = response.query.pages[c].extract;

                $("#wikip").html(hey);

            }); //End .each

        }); //End .done

//-----------------------------------------FLICKR---------------------------------------------------------

    console.log("flickr ready!");

    //site = response.sites[i].name;
     var tag1 = "florida",
         tag2 = "scuba",
         tag3 = site;



    $.getJSON("https://cors-bcs.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?tags="+ tag1 + tag2 + tag3 +"&format=json&nojsoncallback=1", function (data) {
        console.log(data)
        $.each(data.items, function (i, item) {
            $("<img>").attr("src", item.media.m).appendTo("#flickrImg")
        });

    });




//-----------------------------------------WEATHER---------------------------------------------------------


    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
        "q=Orlando,ORL&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(queryURL);
        console.log(response);

        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").html("Wind Speed: " + response.wind.speed);
        $(".humidity").html("Humidity: " + response.main.humidity);
        $(".mainTemp").html("Temperature (F) " + response.main.temp);
        $(".minTemp").html("Min. Temperature: " + response.main.temp_min);
        $(".maxTemp").html("Max Temperature: " + response.main.temp_max);

        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F) " + response.main.temp);
        console.log("Min. Temperature: " + response.main.temp_min);
        console.log("Max Temperature: " + response.main.temp_max);
    });


