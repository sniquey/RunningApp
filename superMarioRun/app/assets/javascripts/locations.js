$(document).ready(function () {
		var locationtracking;
		$("#starttracking").on('click', function() {
			if (locationtracking) {
				return; // timer is already running.
			}
			getLocation();
			locationtracking = setInterval(getLocation, 1000);
			console.log('setInterval returned', locationtracking)
		});
		
		$('#stoptracking').on('click', function () {
			console.log('stopping', locationtracking)
			clearInterval(locationtracking);
			locationtracking = null;
		});

});

function getLocation () {
	// Check to see if the browser supports the GeoLocation API.
	if (navigator.geolocation) {
		console.log("Got your location.");
		// Get the location
		var position;
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			console.log("Latitude: "+ lat);
			console.log("Longitude: "+lon);
			// Show the map
			showMap(lat, lon);
		});
		} else {
	  // Print out a message to the user.
	  // document.write('Your browser does not support GeoLocation');
	  console.log("Fuck. Your browser does not have Geolocation");
	}
}



// Show the user's position on a Google map.
function showMap(lat, lon) {
	// Create a LatLng object with the GPS coordinates.
	var myLatLng = new google.maps.LatLng(lat, lon);

	// Create the Map Options
  var mapOptions = {
    zoom: 8,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // Generate the Map
  var map = new google.maps.Map($('#map'), mapOptions);

  // Add a Marker to the Map
  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Found you!'
  });
}