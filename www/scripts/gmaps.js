function initialize() {
    var mapOptions = {
    center: new google.maps.LatLng(46.947534, 32.055607),
    zoom: 8
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

    var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 0.8,
        scale: 1,
        strokeColor: 'gold',
        strokeWeight: 14
    };

    var marker = new google.maps.Marker({
        position: map.getCenter(),
        icon : goldStar,
        map: map,
        title: 'Click to zoom'
    });

    google.maps.event.addListener(map, 'center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
        map.goldStar(marker.getPosition());
        }, 3000);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
