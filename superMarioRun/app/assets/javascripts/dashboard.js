$(document).ready( function () {
	var mario_theme = new Audio('assets/mario_08.wav');
	var stop = document.getElementById('stop-sound');
	var start = document.getElementById('play-sound');

	var isPlaying = true;

	
	function pause_mario() {
		mario_theme.pause();
		isPlaying = false;
	}
	function play_mario() {
		mario_theme.play();
		isPlaying = true;
	}
	play_mario();

	$(".enable-sounds").click(function () {
		if (isPlaying) {
			pause_mario();
			isPlaying = false;
		} else {
			play_mario();
			isPlaying = true;
		}
	});

	stop.addEventListener("touchstart", pause_mario, false);
	start.addEventListener("touchstart", play_mario, false);

});