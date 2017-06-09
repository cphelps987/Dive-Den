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


$(document).ready(function ($) {


//-----------------------------------------DIVE SITES---------------------------------------------------------


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
        .done(function (diveresponse) {

            var diveResults = diveresponse.data;


            /*for (var i = 0; i < results.length; i++) {

             if (diveresponse.sites[i]) {

             var lat = diveresponse.sites[i].lat

             var lng = diveresponse.sites[i].lng

             }*/
            console.log(diveresponse);
            console.log(diveresponse.sites[1].name);

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
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: florida,
            radius: 1000,
        }, callback);
    }

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        var placeLoc = require('./array.js');
        diveresponse.sites[0];
        //trying to figure out why it wont call the
        var marker = new google.maps.Marker({
            map: map,
            position: placeLoc
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }


//-----------------------------------------WIKIPEDIA---------------------------------------------------------


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
        .done(function (response) {
            console.log('ready2!');
            console.log('response', response);

            var objResult = response

            console.log(objResult);

            $.each(response.query.pages, function (c) {

                var hey = response.query.pages[c].extract;

                $("#wikipediaImages").html(hey);

            }); //End .each

        }); //End .done


//-----------------------------------------FLICKR---------------------------------------------------------


    console.log("flickr ready!")

//var flickrLoopUp= diveResults.sites[1].name;
    /*$.getJSON("https://cors-bcs.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?tags=florida,scuba,"+ flickrLoopUp +"&format=json&nojsoncallback=1", function(data){*/

    $.getJSON("https://cors-bcs.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?tags=florida,scuba&format=json&nojsoncallback=1", function (data) {
        $.each(data.items, function (i, item) {
            $("<img>").attr("src", item.media.m).appendTo("#flickrImg")
            //  .wrap("<a href='" + item.link + "'></a>");
        });

    });


//-----------------------------------------EBAY---------------------------------------------------------


    console.log('readyEbay!');

    $.ajax({
        url: "https://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=DSCNS2cf4-34a4-4921-a079-6b7239ba862&siteid=0&version=515&ItemID=331633600730&IncludeSelector=ShippingCosts&callbackname=jsonpcallback",
        type: "GET",

    }).done(function (response) {
        console.log('readyEbayAjax!');
        console.log('response', response);

    }); // .done


    function _cb_findItemsByKeywords(root) {
        var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
        var html = [];
        html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
        for (var i = 0; i < items.length; ++i) {
            var item = items[i];
            var title = item.title;
            var pic = item.galleryURL;
            var viewitem = item.viewItemURL;
            if (null != title && null != viewitem) {
                html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
                    '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
            }
        }
        html.push('</tbody></table>');
        document.getElementById("ebayResults").innerHTML = html.join("");
    }  // End _cb_findItemsByKeywords() function
// Create a JavaScript array of the item filters you want to use in your request
    var filterarray = [
        {
            "name": "MaxPrice",
            "value": "25",
            "paramName": "Currency",
            "paramValue": "USD"
        },
        {
            "name": "FreeShippingOnly",
            "value": "true",
            "paramName": "",
            "paramValue": ""
        },
        {
            "name": "ListingType",
            "value": ["AuctionWithBIN", "FixedPrice"],
            "paramName": "",
            "paramValue": ""
        },
    ];
// Define global variable for the URL filter
    var urlfilter = "";

// Generates an indexed URL snippet from the array of item filters
    function buildURLArray() {
        // Iterate through each filter in the array
        for (var i = 0; i < filterarray.length; i++) {
            //Index each item filter in filterarray
            var itemfilter = filterarray[i];
            // Iterate through each parameter in each item filter
            for (var index in itemfilter) {
                // Check to see if the paramter has a value (some don't)
                if (itemfilter[index] !== "") {
                    if (itemfilter[index] instanceof Array) {
                        for (var r = 0; r < itemfilter[index].length; r++) {
                            var value = itemfilter[index][r];
                            urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value;
                        }
                    }
                    else {
                        urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
                    }
                }
            }
        }
    }  // End buildURLArray() function

// Execute the function to build the URL filter
    buildURLArray(filterarray);

// Construct the request
// Replace MyAppID with your Production AppID
    var url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=MatthewT-UCFCodin-PRD-47a96b09a-bf1d6db0";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&callback=_cb_findItemsByKeywords";
    url += "&REST-PAYLOAD";
    url += "&keywords=SCUBA";
// url += "&keywords=scuba%diving%fins";
// url += "&keywords=scuba%diving%buoyancy%compensators";
    url += "&paginationInput.entriesPerPage=3";
    url += urlfilter;


// Submit the request
    s = document.createElement('script'); // create script element
    s.src = url;
    document.body.appendChild(s);


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


}); // end document.ready