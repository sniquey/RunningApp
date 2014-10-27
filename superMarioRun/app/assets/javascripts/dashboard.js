$(document).ready( function () {
	play_single_sound();
	function play_single_sound() {
  	document.getElementById('audiotag1').play();
}
function stop_single_sound() {
  document.getElementById('audiotag1').pause();
}
});
