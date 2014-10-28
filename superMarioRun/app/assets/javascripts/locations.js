$(document).ready(function () {
		var locationtracking;
		// If you push the START YOUR RUN button
		$("#starttracking").on('touchstart', function() {
			console.log("FUNCTION CALLED");	
			if (locationtracking) {
				return; // timer is already running.
			}

			// getLocation();
			locationtracking = setInterval(getLocation, 2500);
		});

		// If you push the STOP TRACKING button
		$('#stoptracking').on('touchstart', function () {
			console.log('stopping', locationtracking);
			clearInterval(locationtracking);
			// reset the counter and the location tracking
			locationtracking = null;
			counter = 0;

			// Show the map
			showMap();

		});

});

var lat,
		lon, 
		datetime,
		lat_long_time_object;

var locations_array =[]; 

function getLocation (lat_long_time_object) {
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
			var mushrooms_alert = result[resultLength-1].mushroom;
			var turtles_alert = result[resultLength-1].turtle;

			var coins_there = function(element) {
				return element.coin == true;
			};
			var coin_counter = result.filter(coins_there).length;

			var mushrooms_there = function(element) {
				return element.mushroom == true;
			};
			var mushroom_counter = result.filter(mushrooms_there).length;

			var turtles_there = function(element) {
				return element.turtle == true;
			};
			var turtle_counter = result.filter(turtles_there).length;

			console.log("run distance " + run_distance);
			console.log("run time " + run_time);
			console.log("run pace " + run_pace);
			console.log("coin counter " + coin_counter);
			console.log("mushroom counter " + mushroom_counter);
			console.log("turtle counter " + turtle_counter);


			// Printing things on the screen
			var run_distance_html = '<h3> Run distance: </h3> <h4>' + run_distance.toFixed(2) + 'meters </h4>';
			$('.run_distance').html(run_distance_html);

			var run_time_html = '<h3> Run time: </h3> <h4>' + run_time.toFixed(1) + 'seconds </h4>';
			$('.run_time').html(run_time_html);

			var run_pace_html = '<h3> Run pace: </h3> <h4>' + run_pace.toFixed(2) + 'km/hr </h4>';
			$('.run_pace').html(run_pace_html);


			var coin_counter_html = '<h3> Coins accumulated: </h3> <h4>' + coin_counter.toFixed(0) + ' coins </h4>';
			$('.coin_counter').html(coin_counter_html);

			var mushroom_counter_html = '<h3> Mushrooms eaten: </h3> <h4>' + mushroom_counter.toFixed(0) + ' mushrooms </h4>';
			$('.mushroom_counter').html(mushroom_counter_html);

			var turtle_counter_html = '<h3> Turtles passed: </h3> <h4>' + turtle_counter.toFixed(0) + ' turtles</h4>';
			$('.turtle_counter').html(turtle_counter_html);


			var coins_alert_html = function(coins_alert) {
				if (coins_alert == true) {
					return '<img src="/assets/small_coin_moving.gif">';
				} else {
					return '<img/>';
				}

			};

			$('.coins_alert').html(coins_alert_html(coins_alert));

			var mushrooms_alert_html = function(mushrooms_alert) {
				if (mushrooms_alert == true) {
					return '<img src="/assets/mushroom_moving.gif">';
				} else {
					return '<img/>';
				}
			};

			$('.mushrooms_alert').html(mushrooms_alert_html(mushrooms_alert));

			var turtles_alert_html = function(turtles_alert) {
				if (turtles_alert == true) {
					return '<img src="/assets/turtle_moving_small.gif">';
				} else {
					return '<img/>';
				}
			};

			$('.turtles_alert').html(turtles_alert_html(turtles_alert));

			});


			return;


			
		}, geoError, geoOptions);
	} else { // If geolocation doesn't work
  	console.log("Your browser does not have Geolocation");
	}
}



// Show the user's position on a Google map.
function showMap() {
	// Ask AJAX to call data about the result of the run's locations
	$.ajax('/locations', {
		contentType: 'json',
		type: 'GET',
		dataType: 'json',
	}).done( function( result ){ 
		// debugger; 

		// console.log("This is the final result", result);
	  var mapOptions = {
	    zoom: 15,
	    center: {
	    	lat: result[parseInt((result.length)/2)].latitude,
	    	lng: result[parseInt((result.length)/2)].longitude
	    },
	    // mapTypeId: google.maps.MapTypeId.ROADMAP
	  },
	  map = new google.maps.Map( document.getElementById("map"), mapOptions);

	  var runPlanCoordinates = [];
	  	for (var i = 0; i < result.length-1; i++){
	      var coordinate = {
	      	lat: result[i].latitude,
	      	lng: result[i].longitude
	      };
  	  	runPlanCoordinates.push(coordinate);
	  	}
	  
	  console.log("Coordinates to map", runPlanCoordinates);


	  // Setting running path
	  var runPath = new google.maps.Polyline({
	    path: runPlanCoordinates,
	    geodesic: true,
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 4
	  });

	  // Marking Starting Location
	  var marker_start = new google.maps.Marker({
	      position: {
		    	lat: result[0].latitude,
		    	lng: result[0].longitude
	      },
	      map: map,
	      title: 'Starting Location'
	  });

	  // Marking Finishing Location
	  var marker_finish = new google.maps.Marker({
	      position: {
		    	lat: result[result.length - 1].latitude,
		    	lng: result[result.length - 1].longitude
	      },
	      map: map,
	      title: 'Finishing Location'
	  });

	runPath.setMap(map);
	marker_start.setMap(map);
	marker_finish.setMap(map);
	$("#map").css('height', '200px');
	});
}