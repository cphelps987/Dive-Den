var APIKey = "166a433c57516f51dfab1f7edaed8413";

var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
  "q=Orlando,ORL&units=imperial&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(queryURL);
    console.log(response);

/*    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").html("Wind Speed: " + response.wind.speed);
    $(".humidity").html("Humidity: " + response.main.humidity);*/
    $("#temp").html(response.main.temp);
/*    $(".minTemp").html("Min. Temperature: " + response.main.temp_min);
    $(".maxTemp").html("Max Temperature: " + response.main.temp_max);

    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F) " + response.main.temp);
    console.log("Min. Temperature: " + response.main.temp_min);
    console.log("Max Temperature: " + response.main.temp_max);*/
});

/*$(function(){

    // Specify the ZIP/location code and units (f or c)
    var loc = '32828'; // or e.g. SPXX0050
    var u = 'f';

    var query = "SELECT item.condition FROM weather.forecast WHERE location='" + loc + "' AND u='" + u + "'";
    var cacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
    var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&_nocache=' + cacheBuster;

    window['callback'] = function(data) {
        var info = data.query.results.channel.item.condition;
        $('#icon').css({
            backgroundPosition: '-' + (61 * info.code) + 'px 0'
        }).attr({
            title: info.text
        });
        $('#icon2').append('<img src="http://l.yimg.com/a/i/us/we/52/' + info.code + '.gif" width="34" height="34" title="' + info.text + '" />');
        $('#temp').html(info.temp + '&deg;' + (u.toUpperCase()));
    };

    $.ajax({
        url: url,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'callback'
    });
    
});

*/