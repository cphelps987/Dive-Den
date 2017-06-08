// $(document).ready(function () {

    console.log('Ready - Map');

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
            keyword: 'scuba diving'
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
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }
// });/**/