$(document).ready( function () {
	var logout = document.getElementById('logout');
	logout.addEventListener("touchstart", function () {
		console.log('qoreka');
		var root = window.location.origin;
		window.location = root + "/users/sign_out";
	});
});