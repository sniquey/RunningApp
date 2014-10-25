$(document).ready(function () {
		var locationtracking;
		// If you push the START YOUR RUN button
		$("#starttracking").on('click', function() {
			if (locationtracking) {
				return; // timer is already running.
			}

			// getLocation();
			locationtracking = setInterval(getLocation, 2500);
		});

		// If you push the STOP TRACKING button
		$('#stoptracking').on('click', function () {
			console.log('stopping', locationtracking);
			clearInterval(locationtracking);
			// reset the counter and the location tracking
			locationtracking = null;
			counter = 0;
		});

});

var lat,
		lon, 
		datetime,
		lat_long_time_object;

var locations_array =[]; 

function getLocation (lat_long_time_object, counter) {
	// Check to see if the browser supports the GeoLocation API.
	if (navigator.geolocation) {
		console.log("Got your location.");
		// Get the location
		var position;

		var geoOptions = {
			enableHighAccuracy: true
		};

		function geoError () {
			alert("Sorry, you have failed that");
		}

		navigator.geolocation.getCurrentPosition(function(position) {
			// Find the latitude, longitude and time of the GPS call
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
			var location = {
				"location[latitude]":lat,
				"location[longitude]":lon,
				"authenticity_token": $('meta[name="csrf-token"]').attr('content')
				// "location[time]":datetime
			};
			//locations_array.push(location);
			$.post('/locations', location);

			// Show the map
			// showMap(lat, lon);

			
		}, geoError, geoOptions);
	} else { // If geolocation doesn't work
  	console.log("Your browser does not have Geolocation");
	}
}



// Show the user's position on a Google map.
function showMap(lat, lon) {
	// console.log("Latitude: ", lat);
	// console.log("Longtitude: ", lon);
	// Create a LatLng object with the GPS coordinates.
	// var myLatLng = new google.maps.LatLng(lat, lon);
	// Create the Map Options
  var mapOptions = {
    zoom: 16,
    center: {
    	lat: lat,
    	lng: lon
    }
    // mapTypeId: google.maps.MapTypeId.ROADMAP
  },
  map = new google.maps.Map( document.getElementById("map"), mapOptions);

  // Add a Marker to the Map
  var marker = new google.maps.Marker({
      position: {
	    	lat: lat,
	    	lng: lon
      },
      map: map,
      title: 'Found you!'
  });
  $("#map").css('height', '200px');
}