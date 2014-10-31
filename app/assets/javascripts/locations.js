
var start_song = new Audio('http://themushroomkingdom.net/sounds/wav/smw/smw_course_clear.wav'),
	coin_sound = new Audio('http://themushroomkingdom.net/sounds/wav/smw/smw_coin.wav'),
	mushroom_sound = new Audio('http://themushroomkingdom.net/sounds/wav/smw/smw_1-up.wav'), // Power-up sound
	end_song = new Audio('http://themushroomkingdom.net/sounds/wav/smb/smb_stage_clear.wav'),
	startRunning = null;

window.coin_sound = new Audio('http://themushroomkingdom.net/sounds/wav/smw/smw_coin.wav');
window.end_song = new Audio('http://themushroomkingdom.net/sounds/wav/smb/smb_stage_clear.wav');
window.mushroom_sound = new Audio('http://themushroomkingdom.net/sounds/wav/smw/smw_1-up.wav');

$(document).ready(function () {

		var locationtracking;
		var pedometer_tracking;
		// If you push the START YOUR RUN button
		startRunning = function() {
			// Stop the song!
			if (isPlaying == true) {
				$('.toggle').click();
			}

			window.navigator.vibrate(200); // vibrate to test it is working / run is starting 
			start_run_song = start_song.play();
			// window.setTimeout(start_run_song, 8000);

			console.log("FUNCTION CALLED");	

			console.log(locationtracking, " :Location Tracking");
			console.log(pedometer_tracking, " :Pedometer Tracking");

			// pedometer_tracking = false;
			if ((locationtracking) && (pedometer_tracking)) {
				console.log()
				return; // timer is already running.
			}

			locationtracking = setInterval(getLocation, 2500);
			pedometer_tracking = pedometer();

			$('html').addClass('running');
		};

		$('html').on('touchstart', '#startrun', startRunning);
		// startRunning();

		// If you push the STOP TRACKING button
		$('html').on('touchstart', '#stoprun', function () {
			window.end_song.play();
			clearInterval(locationtracking);
			clearTimeout(pedometer_tracking);

			console.log('stopping!!!', locationtracking);
			console.log(" STOP SOUND CALLED! ", end_song);
			// debugger;
			// Playing song

			// reset the counter and the location tracking
			locationtracking = null;
			pedometer_tracking = null;
			counter = 0;

			// Show the map
			showMap();
			$('html').removeClass('running');
		});

});

var lat,
	lon, 
	datetime;

var locations_array =[]; 

function getLocation (coin_sound, mushroom_sound) {
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
			// console.log("Latitude: "+ lat);
			// console.log("Longitude: "+lon);
			// console.log("Time is " + datetime);

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
			var run_distance ;
			if (result.length > 0) {
				run_distance = result[resultLength - 1].cumulative_distance;
			} else {
				run_distance = 0;
			}

			var run_time;
			if (resultLength > 1) {
				run_time = (Date.parse(result[resultLength - 1].created_at) - Date.parse(result[0].created_at))/1000;
			 } else {
			 	run_time = 0
			 }

			var run_pace = (run_distance)/(run_time)*(3.6); // from m/s to km/hour

			var coins_alert;
			var mushrooms_alert;
			var turtles_alert
			if (resultLength > 0) {
				coins_alert = result[resultLength-1].coin;
				mushrooms_alert = result[resultLength-1].mushroom;
				turtles_alert = result[resultLength-1].turtle;
			} else {
				coins_alert = false;
				mushrooms_alert = false;
				turtles_alert = false;
			}

			var coins_there = function(element) {
				// vibrates phone for 2 seconds
				window.navigator.vibrate(2000);
				return element.coin == true
			};
			var coin_counter = result.filter(coins_there).length;

			var mushrooms_there = function(element) {
				// vibrates for 200 ms, then waits 100ms then 200ms
				navigator.vibrate([200, 100, 200]);
				return element.mushroom == true
			};
			var mushroom_counter = result.filter(mushrooms_there).length;

			var turtles_there = function(element) {
				return element.turtle == true
			};
			var turtle_counter = result.filter(turtles_there).length;

			console.log("run distance " + run_distance);
			console.log("run time " + run_time);
			console.log("run pace " + run_pace);
			console.log("coin counter " + coin_counter);
			console.log("mushroom counter " + mushroom_counter);
			console.log("turtle counter " + turtle_counter);


			// Printing things on the screen
			var kilom = Math.floor(run_distance / 1000);
			var meters = (run_distance % 1000);

			var run_distance_html = '<h4> Run distance: ' + kilom.toFixed(0) + ' km, ' + meters.toFixed(0) + ' m </h4>';
			$('.run_distance').html(run_distance_html);

			// Converting time
			    var hours = Math.floor(run_time / (60 * 60));
			    var divisor_for_minutes = run_time % (60 * 60);
			    var minutes = Math.floor(divisor_for_minutes / 60);
			    var divisor_for_seconds = divisor_for_minutes % 60;
			    var seconds = Math.ceil(divisor_for_seconds);

			var run_time_html = '<h4> Run time: ' + hours + ':' + minutes + ':' + seconds + ' </h4>';
			$('.run_time').html(run_time_html);

			if (run_pace != +run_pace) {
				run_pace = 0;
			}

			var run_pace_html = '<h4> Run pace: ' + run_pace.toFixed(2) + ' km/hr </h4>';
			$('.run_pace').html(run_pace_html);


			var coin_counter_html = coin_counter.toFixed(0);
			$('.coin_counter h3').text(coin_counter_html);

			var mushroom_counter_html = mushroom_counter.toFixed(0);
			$('.mushroom_counter h3').text(mushroom_counter_html);

			var turtle_counter_html = turtle_counter.toFixed(0);
			$('.turtle_counter h3').text(turtle_counter_html);

			var coins_alert_html = function(coins_alert, coin_sound) {
				if (coins_alert == true) {
					window.coin_sound.play();
					return '<img src="/assets/small_coin_moving.gif">';
				} else {
					return '<div/>';
				}

			};

			$('.coins_alert').html(coins_alert_html(coins_alert));

			var mushrooms_alert_html = function(mushrooms_alert, mushroom_sound) {
				if (mushrooms_alert == true) {
					var mushroom_sound = new Audio('http://themushroomkingdom.net/sounds/wav/smw/smw_1-up.wav'); // Power-up sound
					window.mushroom_sound.play();
					return '<img src="/assets/mushroom_moving.gif">';
				} else {
					return '<div/>';
				}
			};

			$('.mushrooms_alert').html(mushrooms_alert_html(mushrooms_alert));

			var turtles_alert_html = function(turtles_alert) {
				if (turtles_alert == true) {
					return '<img src="/assets/turtle_moving_small.gif">';
				} else {
					return '<div/>';
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







//// PEDOMETER STUFF

// Position Variables
var x = 0;
var y = 0;
var z = 0;
var time;

// Declaring an array which all the accelerometer information will sit
// Will need to map these items later (x, y and z values)
var accel_array = [];
var acceleration_squared;
var accel_squared = [];

var step_counter = 0;
var running_average;
var deviation_from_average;
var deviation_array = [];
var comparison_value = 3;

var pedometer = function() {
      // Device motion stuff  

    if (window.DeviceMotionEvent==undefined) {
        document.getElementById("no").style.display="block";
        document.getElementById("yes").style.display="none";

    } else {
         
    var output_xyz ;
        // Print out information about the accelerometer
        window.ondevicemotion = function(event) {
                ax = event.accelerationIncludingGravity.x;
                ay = event.accelerationIncludingGravity.y;
                az = event.accelerationIncludingGravity.z;
                // output_xyz = "<h4> x: " + event.accelerationIncludingGravity.x.toFixed(1) + " y: " + event.accelerationIncludingGravity.y.toFixed(1) + " z: " + event.accelerationIncludingGravity.z.toFixed(1) + "</h4>";
                
                accel_array.push({
                    'ax': event.accelerationIncludingGravity.x,
                    'ay': event.accelerationIncludingGravity.y,
                    'az': event.accelerationIncludingGravity.z,
                    'datetime': new Date()
                });

                // Calculation of sqrt (x^2 + y^2 + z^2) to find absolute value of acceleration
                acceleration_squared = Math.sqrt( (event.accelerationIncludingGravity.x)*(event.accelerationIncludingGravity.x) + (event.accelerationIncludingGravity.y)*(event.accelerationIncludingGravity.y) + (event.accelerationIncludingGravity.z)*(event.accelerationIncludingGravity.z) ).toFixed(3) ;

                // Adds to front of an array
                accel_squared.unshift( acceleration_squared );

                // Find the exponential moving average as a value
                running_average = 10  ;             //(accel_squared);

                // Deviation from the average
                deviation_from_average = Math.abs(acceleration_squared - running_average);
                deviation_array.unshift(deviation_from_average);

                if ((comparison_value == 0.25) && (deviation_from_average <= comparison_value)) {
                    comparison_value = 3;
                    step_counter += 1;
                } else if ((comparison_value == 3) && (deviation_from_average >= comparison_value)) {
                    comparison_value = 0.25;
                    step_counter += 1;
                } 

                // TODO - figure out how to incorporate this array of accel_squared to read pedometer data
                // Need to look for a max, min and brushing through the running_average value

        };

    } 
    // Printing information on screen every 0.5 seconds
    return setInterval(function() {
    	step_counter_html = '<h4>Step counter: ' + step_counter + ' steps </h4>';
        $('.step_counter').html(step_counter_html);
                // Posting the step counter to the runs database
    
    	// can update steps without needing to know the exact run number
        $.ajax('/runs/steps', {
            type: 'POST',
            dataType: 'json',
            data: {
                "step_count":step_counter
            }
        });
    }, 500);

};
