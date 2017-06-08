$(document).ready(function () {

console.log('ready1!');

var APIKey = "166a433c57516f51dfab1f7edaed8413";

var queryURL = "http://api.openweathermap.org/data/2.5/forecast?" +
  "q=Orlando,ISO 3166&mode=xml&units=imperial&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
	console.log(queryURL);
    console.log(response);