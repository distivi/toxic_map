$(document).ready(function(){
	calculateSideBarWidth();

	$("#side-bar-handler").click(function(){
		$("#side-bar").toggle(function(){
			return false;
		},function(){
			return false;
		});
	});
});


var calculateSideBarWidth = function(){
	var commonWidth = 0;
	// 326
	var sideBar = $("#side-bar > label").map(function(){
		console.log(parseFloat($(this).css("width")));
		commonWidth += parseFloat($(this).css("width")) + 21;
	});
	console.log(commonWidth);
	$("#side-bar").css("width",commonWidth);
}

