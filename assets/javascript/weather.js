var APIKey = "166a433c57516f51dfab1f7edaed8413";

var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
  "q=Orlando,ORL&units=imperial&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
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

  $(document).ready(function() {
  $.simpleWeather({
    location: 'Orlando, FL',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});