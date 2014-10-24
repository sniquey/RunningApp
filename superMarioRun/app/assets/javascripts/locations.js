$(document).ready(function () {
		var locationtracking;
		$("#starttracking").on('click', function() {
			if (locationtracking) {
				return; // timer is already running.
			}
			getLocation();
			locationtracking = setInterval(getLocation, 5000);
			// console.log('setInterval returned', locationtracking)
		});
		
		$('#stoptracking').on('click', function (lat_long_time_object) {
			console.log('stopping', locationtracking);
			clearInterval(locationtracking);
			// reset the counter and the location tracking
			locationtracking = null;
			counter = 0;
		});

});

var lat_long_time_object;
var counter = 0;
var lat;
var lon; 
var datetime;

function getLocation (lat_long_time_object, counter) {
	// Check to see if the browser supports the GeoLocation API.
	if (navigator.geolocation) {
		console.log("Got your location.");
		// Get the location
		var position;
		navigator.geolocation.getCurrentPosition(function(position) {
			// Find the latitude, longitude and time of the GPS call
			counter += 1;
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			
			var currentdate = new Date(); 
			datetime = currentdate.getDate() + "/"
			                + (currentdate.getMonth()+1)  + "/" 
			                + currentdate.getFullYear() + " @ "  
			                + currentdate.getHours() + ":"  
			                + currentdate.getMinutes() + ":" 
			                + currentdate.getSeconds();
			console.log("Latitude: "+ lat);
			console.log("Longitude: "+lon);
			console.log("Time is " + datetime);
			// Saving this into the counter
			// lat_long_time_object[counter] = {
			// 	latitude: lat,
			// 	longitude: lon,
			// 	time: datetime
			// }; 
			// Show the map
			showMap(lat, lon);
		});
		} else {
	  // Print out a message to the user.
	  // document.write('Your browser does not support GeoLocation');
	  console.log("Your browser does not have Geolocation");
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
  var map = new google.maps.Map($('.map'), mapOptions);

  // Add a Marker to the Map
  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Found you!'
  });
}