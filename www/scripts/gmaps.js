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

    google.maps.event.addListener(map, 'click', function(event) {
       placeMarker(event.latLng);
    });

    function getCircle(magnitude) {
        console.log(magnitude);
      return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'green',
        fillOpacity: .2,
        scale: magnitude,//Math.pow(2, magnitude) / Math.PI,
        strokeColor: 'white',
        strokeWeight: .5
      };
    }

    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location, 
            map: map,
            icon: getCircle(100)
        });
    }
}

google.maps.event.addDomListener(window, 'load', initialize);