$(document).ready( function () {
	var mario_theme = new Audio('assets/mario_08.wav');
	var stop = document.getElementById('stop-sound');
	var start = document.getElementById('play-sound');
	stop.addEventListener("touchstart", pause_mario, false);
	start.addEventListener("touchstart", play_mario, false);

	function pause_mario() {
		mario_theme.pause();
	}
	function play_mario() {
		mario_theme.play();
	}
	play_mario();
});
