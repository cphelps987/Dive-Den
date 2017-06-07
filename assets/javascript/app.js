$(document).ready(function () {

    console.log("ready!");

    var authKey = "AIzaSyClbAC2i9F_DocCTnfZokjM12bMdsT7bSs";
    var queryURL = "https://maps.googleapis.com/maps/api/js?key=" + authKey + "&callback=initMap";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function () {

        function initMap() {
            var uluru = {lat: -25.363, lng: 131.044};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
        }
    });
});


