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
    console.log("Wind Speed: " + response.wind.speed);
});