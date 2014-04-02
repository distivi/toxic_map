$(document).ready(function(){

	$('*[toxic-attr]').click(function(e) {
		var target = $(e.target);
		target.parents(".input-group").children().first().val(target.text());
	});


	$("#calculate-button").click(function(clickEvent) {
		var results = {};
		$("*[toxic-input]").each(function(i,element){
			var value = $(element).val()
			var key = $(element).attr("toxic-input");
			results[key] = value;
		});

		// TODO: calculate something in C++
		alert(results.toString());
	});
});


