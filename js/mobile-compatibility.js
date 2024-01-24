$(document).ready(function() {
	if(window.matchMedia("(max-width: 767px)").matches) {
		// The viewport is less than 768 pixels wide Phone
		$(".sidebar").remove();
		$(".main").css("marginLeft","6%");
		$(".main").css("width","90%");
		$(".main-container").css("border-bottom","0px");
	}
});