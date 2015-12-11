/* global gus garry:true */
/* eslint no-warning-comments: [1, {terms: [todo, fix, help], location: anywhere}] */

var $form = $("#form"),
	$formEquationType = $("input:radio"),
	
	$fEq1 = $("#formEquation1"),
	$fEq2 = $("#formEquation2"),
	$fEq3 = $("#formEquation3"),

	shion;

// When the user changes the amount of equations to input, then show/hide the equation inputs.
$formEquationType.each(function(index, el) {
	$(this).change(function(event) {
		console.log(Number($(this).val()));
		if (Number($(this).val()) === 1) {
			// This is when the user presses "Equation 1" radio.
			$("#formEquation2").addClass("invisible");
			$("#formEquation3").addClass("invisible");
		} else if (Number($(this).val()) === 2) {
			// This is when the user presses "Equation 2" radio.
			$("#formEquation2").removeClass("invisible");
			$("#formEquation3").addClass("invisible");
		} else if (Number($(this).val()) === 3) {
			// This is when the user presses "Equation 3" radio.
			$("#formEquation2").removeClass("invisible");
			$("#formEquation3").removeClass("invisible");
		}
	});
});

// Automatically hide the second and third equation input fields in the beginning.
$("#formEquation2").addClass("invisible");
$("#formEquation3").addClass("invisible");

$form.submit(function(event) {
	var xyz = [
		Number()
	];
});