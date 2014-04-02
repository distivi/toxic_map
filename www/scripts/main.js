$(document).ready(function(){


	// Click functions

	$(".dropdown-menu").on('click','*[toxic-attr]',function(e) {
		var target = $(e.target);
		var inputField = target.parents(".input-group").children().first();
		inputField.val(target.text());

		if (inputField.attr("toxic-input") == "svsp_type") {
			changeToxicAttributesForIsothermal(inputField.val() == "Изотермия");
		};
	});

	$("#calculate-button").click(function(clickEvent) {
		var results = {};
		var isAllFieled = true;
		$("*[toxic-input]").each(function(i,element){
			var value = $(element).val()
			if (!value || value == "") {
				isAllFieled = false;
				return;
			} else {
				var key = $(element).attr("toxic-input");
				results[key] = value;
			}
		});

		if (isAllFieled) {
			// TODO: calculate something in C++
			alert(results.toString());
		} else {
			alert("Please fill all fields");
		};
	});

	// Change design functions

	function changeToxicAttributesForIsothermal(isIsothermal) {
		var temperatureMenu = $("*[dinamic-toxic-dropdown='temperature']");
		var temperatureItems =  temperatureMenu.children();

		var windMenu = $("*[dinamic-toxic-dropdown='wind']");
		var windItems = windMenu.children();

		var inputTemperature = $("*[toxic-input='temperature']");
		var inputWind = $("*[toxic-input='wind']");

		if (isIsothermal) {
			if (temperatureItems.length != 4) {
				var newItem = "<li><a toxic-attr>+40</a></li>"
				temperatureMenu.append(newItem);
				inputTemperature.val("");
			}
			if (windItems.length != 5) {
				var newItem = "<li><a toxic-attr>5</a></li>"
				windMenu.append(newItem);
				inputWind.val("");
			}
		} else {
			if (temperatureItems.length == 4) {
				temperatureItems.last().remove();
				inputTemperature.val("");
			}
			if (windItems.length == 5) {
				windItems.last().remove();
				inputWind.val("");
			}
		}
	}


});


