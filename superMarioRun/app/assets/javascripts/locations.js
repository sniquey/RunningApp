$(document).ready(function () {
		var locationtracking;
		// If you push the START YOUR RUN button
		$("#starttracking").on('click', function() {
			console.log("FUNCTION CLALLEd");	
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
			$.ajax('/locations', {
				type: 'POST',
				dataType: 'json',
				data: location
			}).done(function ( result ) {
				// use result data here
				console.log('make this result have the run data you care about', result);
			// result should be the run data

			// Pulling out run details from AJAX, based on the last location
			// Need to ask AJAX to find the location.run and then manipulate that data 
			// // Adding updated run details to the run page
			
			var resultLength = result.length;
			var run_distance = result[resultLength - 1].cumulative_distance;
			var run_time = (Date.parse(result[resultLength - 1].created_at) - Date.parse(result[0].created_at))/1000;
			var run_pace = (run_distance*1000) / (run_time*60*60);
			var coins_alert = result[resultLength-1].coin;
			console.log("run distance " + run_distance);
			console.log("run time " + run_time);
			console.log("run pace " + run_pace);

			var run_distance_html = '<h3> Run distance: </h3> <h4>' + run_distance.toFixed(2) + 'meters </h4>';
			$('.run_distance').html(run_distance_html);

			var run_time_html = '<h3> Run time: </h3> <h4>' + run_time.toFixed(1) + 'seconds </h4>';
			$('.run_time').html(run_time_html);

			var run_pace_html = '<h3> Run pace: </h3> <h4>' + run_pace.toFixed(2) + 'km/hr </h4>';
			$('.run_pace').html(run_pace_html);

			var coins_alert_html = function(coins_alert) {
				if (coins_alert == true) {
					return '<img src="http://www.mariowiki.com/images/thumb/1/11/Mk7_coin.jpg/120px-Mk7_coin.jpg">';
				} else {
					return '<img/>'
				}

			};

			$('.coins_alert').html(coins_alert_html(coins_alert));

			});


			return;


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