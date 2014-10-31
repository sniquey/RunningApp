var isPlaying = true;

$(document).ready( function () {
	var mario_theme = new Audio('/assets/mario_08.wav');
	console.log("played mario now hello world bitoches")

	function pause_mario() {
		mario_theme.loop = false;		
		mario_theme.pause();
		isPlaying = false;
	}
	function play_mario() {
		mario_theme.loop = true;
		mario_theme.play();
		isPlaying = true;
	}
	play_mario();

	// Delegation because ratchet.js sucks ass.
	$('body').on('click', ".toggle", function () { // changed the class to be clicked on from 'enable-sound' to 'toggle'
		if (isPlaying) { 
			console.log("going to pause mario");
			isPlaying = false;
			pause_mario();
		} else {
			console.log("going to play mario");
			isPlaying = true;
			play_mario();
		}
	});

	var showToggleState = function () {
		if (isPlaying) {
			$('.toggle').addClass('active');
		} else {
			$('.toggle').removeClass('active');
		}
	}

	$(window).on('push', showToggleState);

});