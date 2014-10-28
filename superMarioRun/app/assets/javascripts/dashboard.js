$(document).ready( function () {
	var mario_theme = new Audio('assets/mario_08.wav');
	var stop = document.getElementById('stop-sound');
	var start = document.getElementById('play-sound');
	
	function pause_mario() {
		mario_theme.pause();
	}
	function play_mario() {
		mario_theme.play();
	}
	play_mario();

	// stop.addEventListener("touchstart", pause_mario, false);
	// start.addEventListener("touchstart", play_mario, false);

	// var currentLocation = location.href, runActive;


	// function defineURLandRunActive () {
		
	// 	if ( currentLocation.search('#stop-run') <= 0 ) {
	// 		runActive = false;
	// 	} else {
	// 		$("#startrun").css('background', 'red').text('Stop Run');
	// 		runActive = true;
	// 	}
	// }

	// defineURLandRunActive();

	// $("#startrun").click(function (event) {
	// 	if (runActive) {
	// 		event.preventDefault();
	// 	}

	// 	if (runActive) {
	// 		$("#startrun").css('background', 'red').text('Stop Run');
	// 		runActive = false;
	// 	} else {
	// 		$("#startrun").css('background', 'green').text('Start Run');
	// 		runActive = true;
	// 	}
	// });

	// var stop = $('#startrun');
	// stop.toggle( showOrHide );
	// if ( showOrHide === true ) {
 // 	$stop.show();
	// } else if ( showOrHide === false ) {
 //  	$stop.hide();
	// }

	// $( "#startrun" ).click(function() {
		// event.preventDefault();
		// $( "#startrun" ).toggle();
	// });
});

