$(document).ready( function () {
	var mario_theme = new Audio('/assets/mario_08.wav');
	// var stop = document.getElementById('stop-sound');
	// var start = document.getElementById('play-sound');

	var isPlaying = true;

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

	$(".toggle").click(function () { // changed the class to be clicked on from 'enable-sound' to 'toggle'
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

	// start.addEventListener("touchstart", play_mario, false);
	// stop.addEventListener("touchstart", pause_mario, false);

});