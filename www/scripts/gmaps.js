Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

Number.prototype.toDeg = function() {
   return this * 180 / Math.PI;
}

google.maps.LatLng.prototype.destinationPoint = function(brng, dist) {
   dist = dist / 6371;  
   brng = brng.toRad();  

   var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();

   var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                        Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

   var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                Math.cos(lat1), 
                                Math.cos(dist) - Math.sin(lat1) *
                                Math.sin(lat2));

   if (isNaN(lat2) || isNaN(lon2)) return null;

   return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
}

// This example creates a custom overlay called USGSOverlay, containing
// a U.S. Geological Survey (USGS) image of the relevant area on the map.

// Set the custom overlay object's prototype to a new instance
// of OverlayView. In effect, this will subclass the overlay class.
// Note that we set the prototype to an instance, rather than the
// parent class itself, because we do not wish to modify the parent class.

var overlay;
USGSOverlay.prototype = new google.maps.OverlayView();

// Initialize the map and the custom overlay.

function initialize() {
  var mapOptions = {
    zoom: 11,
    // center: new google.maps.LatLng(62.323907, -150.109291),
    center: new google.maps.LatLng(46.972370, 32.016687),
    mapTypeId: google.maps.MapTypeId.MAP
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);



  // var swBound = new google.maps.LatLng(62.281819, -150.287132);
  // var neBound = new google.maps.LatLng(62.400471, -150.005608);
  var swBound = new google.maps.LatLng(46.930282, 31.974599);
  var neBound = new google.maps.LatLng(47.014458, 32.058775);

  var bounds = new google.maps.LatLngBounds(swBound, neBound);

  // The photograph is courtesy of the U.S. Geological Survey.
  var srcImage = "./resources/circle.png";

  // The custom USGSOverlay object contains the USGS image,
  // the bounds of the image, and a reference to the map.
  // overlay = new USGSOverlay(bounds, srcImage, map);

  function placeToxicObject(latLng,zone_height,zone_width) {
    console.log(latLng);
     
    
    var radius_width = zone_width / 2;
    var radius_heigth = zone_height / 2;
    var radiusInKm = Math.pow((Math.pow(radius_width,2) + Math.pow(radius_heigth,2)),0.5);
    console.log("radiusInKm " + radiusInKm);


    ne_angle = (Math.acos(radius_width / radiusInKm)).toDeg();
    console.log("ne_angle " + ne_angle);

    sw_angle = ne_angle + 180;
    console.log("sw_angle " + sw_angle);


    sw = latLng.destinationPoint(sw_angle, radiusInKm);
    ne = latLng.destinationPoint(ne_angle, radiusInKm);

    var bounds = new google.maps.LatLngBounds(sw, ne);

    // The photograph is courtesy of the U.S. Geological Survey.
    var srcImage = "./resources/circle.png";

    // The custom USGSOverlay object contains the USGS image,
    // the bounds of the image, and a reference to the map.
    var overlay = new USGSOverlay(bounds, srcImage, map);
  }


  google.maps.event.addListener(map, 'click', function(event) {
    console.log("click");
    
    var width = mainWindow.calculate(globalToxicParams["svsp_type"],
      globalToxicParams["temperature"],
      globalToxicParams["chemicals"],
      globalToxicParams["nhr_value"],
      globalToxicParams["wind"],
      "2");
    // console.log("test width = " + width);
     placeToxicObject(event.latLng,width,width);
  });

  
  function showModal(argument) {
    console.log("show modal");
  }

  
}

/** @constructor */
function USGSOverlay(bounds, image, map) {

  // Initialize all properties.
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;

  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay.
  this.setMap(map);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
USGSOverlay.prototype.onAdd = function() {

  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  // Create the img element and attach it to the div.
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';
  div.appendChild(img);

  this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
};

USGSOverlay.prototype.draw = function() {

  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's div to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
USGSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};

google.maps.event.addDomListener(window, 'load', initialize);
