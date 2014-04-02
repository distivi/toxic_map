function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(46.947534, 32.055607),
        zoom: 8
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

    var goldStar = {
        // path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        path: 'M -20,-20 20,-20 20,20 -20,20 z',
        fillColor: 'yellow',
        fillOpacity: 0.8,
        scale: 1,
        strokeColor: 'gold',
        strokeWeight: 0
    };

   var markerImage = new google.maps.MarkerImage(
        'http://icons.iconarchive.com/icons/hopstarter/sleek-xp-software/256/Yahoo-Messenger-icon.png',
        new google.maps.Size(256,256),
        new google.maps.Point(0,0),
        new google.maps.Point(128,128)
    );

    google.maps.event.addListener(map, 'click', function(event) {
       placeMarker(event.latLng);
    });

    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location, 
            map: map,
        });

        // var marker2 = new google.maps.Marker({
        //     position: location, 
        //     icon : markerImage,
        //     map: map
        // });
    }
}

google.maps.event.addDomListener(window, 'load', initialize);




