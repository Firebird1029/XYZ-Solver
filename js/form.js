"use strict";
/* global Fraction */
/* eslint no-warning-comments: [2, { "terms": ["todo", "fix", "help"], "location": "anywhere" }] */

var $form = $("#form"),
	$formEquationType = $("input:radio"),
	
	$fEq1 = $("#formEquation1"),
	$fEq2 = $("#formEquation2"),
	$fEq3 = $("#formEquation3"),

	$fEqIn1 = $("#formEquationInput1"),
	$fEqIn2 = $("#formEquationInput2"),
	$fEqIn3 = $("#formEquationInput3"),

	i;

// When the user changes the amount of equations to input, then show/hide the equation inputs.
$formEquationType.each(function (index, el) {
	$(this).change(function (event) {
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

// Convert all inputs to standard form.
function regexOps (eq1, eq2, eq3, numOfEquations) {
	var equation,
		faultyEquation = 0,
		quickFaulty = true,
		validNumbers = "0123456789",
		validNum,
		i;

	// Repeat with every equation. Length - 1 because we are accounting for the argument numOfEquations.
	for (i = 0; i < arguments.length - 1; i++) {
		equation = arguments[i];
		console.log(equation);

		// Make sure the equation is valid.
		faultyEquation = (equation.indexOf("x") === -1) ? 1 : faultyEquation;
		faultyEquation = (equation.indexOf("y") === -1) ? 2 : faultyEquation;
		faultyEquation = (equation.indexOf("+") === -1 && equation.indexOf("-") === -1) ? 3 : faultyEquation;

		// If there are 3 equations inputted, check for a z.
		if (numOfEquations === 3) {
			faultyEquation = (equation.indexOf("z") === -1) ? 4 : faultyEquation;
		}
		
		// Make sure there are numbers in the equation.
		for (validNum in validNumbers.split("")) {
			if (equation.indexOf(validNum) > -1) {
				quickFaulty = false;
			}
		}
		faultyEquation = (quickFaulty) ? 5 : faultyEquation;

		console.log(faultyEquation);

		// Find out what linear form this input is in.
		if (equation.indexOf("x") < equation.indexOf("=")) {
			// Standard form detected.

		};
	}
	var regexString = /([0-9.\/]*) ? ?x ? ?\+ ? ?([0-9.\/]*) ? ?y ? ?\= ? ?([0-9.\/]*)/g;
	var str = "5/10x + 7y = 10\n18x+ 9y= 65\n3854x +9y =45\nx+5y  =53\n1.5x + 4.3y=2.343";
	var matches;
	while ((matches = regexString.exec(str)) !== null) {
		if (matches.index === regexString.lastIndex) {
			regexString.lastIndex++;
		}
		console.log(matches);
	}

	console.log(matches);
}

// When the user submits the form, do the magic.
$form.submit(function (event) {
	if ($("input:radio[name=numEquations]").eq(2).is(":checked")) {
		// Three equations.
		regexOps($fEqIn1.val(), $fEqIn2.val(), $fEqIn3.val(), 3);
	} else if ($("input:radio[name=numEquations]").eq(1).is(":checked")) {
		// Two equations.
		regexOps($fEqIn1.val(), $fEqIn2.val(), 2);
	} else {
		// One equation.
	}

	return false;
});