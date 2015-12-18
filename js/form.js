"use strict";
/* global Fraction */
/* eslint no-warning-comments: [1, { "terms": ["todo", "fix", "help", "manual"], "location": "anywhere" }] */

var $form = $("#form"),
	$formEquationType = $("input:radio"),

	$fEq1 = $("#formEquation1"),
	$fEq2 = $("#formEquation2"),
	$fEq3 = $("#formEquation3"),

	$fEqIn1 = $("#formEquationInput1"),
	$fEqIn2 = $("#formEquationInput2"),
	$fEqIn3 = $("#formEquationInput3"),

	result,
	i;

// When the user changes the amount of equations to input, then show/hide the equation inputs.
$formEquationType.each(function formEquationTypeEach () {
	$(this).change(function changeEquationsAmountDOM () {
		if (Number($(this).val()) === 1) {
			// This is when the user presses "Equation 1" radio.
			$fEq2.addClass("hidden");
			$fEq3.addClass("hidden");
		} else if (Number($(this).val()) === 2) {
			// This is when the user presses "Equation 2" radio.
			$fEq2.removeClass("hidden");
			$fEq3.addClass("hidden");
		} else if (Number($(this).val()) === 3) {
			// This is when the user presses "Equation 3" radio.
			$fEq2.removeClass("hidden");
			$fEq3.removeClass("hidden");
		}
	});
});

// Automatically hide the second and third equation input fields in the beginning.
$fEq2.addClass("hidden");
$fEq3.addClass("hidden");

// TODO: Verify equations (simply move from regexOps function to here.)
function verifyEquations (eq1, eq2, eq3, numOfEquations) {}

// Convert all inputs to standard form.
function regexOps (eq1, eq2, eq3, numOfEquations) {
	var equation, // This is the equation that is being inputted by the user. It will undergo many algorithms and a long journey ahead.
		faultyEquation = 0, // A bunch of checks will determine if the equation is faulty, by changing this number.
		quickFaulty = true, // This is a NOT gate. It will turn false when a number is detected (in one of the checks).
		validNumbers = "0123456789", // This is the numbers that will be used to detect if it exists in the equation.
		validNum, // This just needs to be declared before the for in loop.
		regexString, // This variable will change depending on what form of the equation was detected.
		match = null, // When the regex loop runs, it will send the match to this variable.
		matches = [], // This is an array that will contain the numbers returned from each match.
		finalAns = {}; // This is the object that will be used to be sent to Jason's algorithms.

	// Repeat with every equation. Length - 1 because we are accounting for the argument numOfEquations.
	for (i = 0; i < arguments.length - 1; i++) {
		// Reset the vars to account for the next equation that is inputted by the user.
		equation = arguments[i];
		faultyEquation = 0;
		quickFaulty = true;
		match = null;
		matches = [];
		finalAns = {};
		console.log(equation);

		// In order to check if the equation is valid, first locate all the needed characters in an equation.
		// The location of the characters will also determine what form the equation is in.
		var xLoc = equation.indexOf("x"),
			yLoc = equation.indexOf("y"),
			zLoc = equation.indexOf("z"),
			plusLoc = equation.indexOf("+"),
			minusLoc = equation.indexOf("-"),
			equalsLoc = equation.indexOf("=");

		// Make sure the equation is valid.
		faultyEquation = (xLoc < 0) ? 1 : faultyEquation;
		faultyEquation = (yLoc < 0) ? 2 : faultyEquation;
		faultyEquation = (plusLoc < 0 && minusLoc < 0) ? 3 : faultyEquation;
		faultyEquation = (equalsLoc < 0) ? 4 : faultyEquation;

		// If there are 3 equations inputted, check for a z.
		if (numOfEquations === 3) {
			faultyEquation = (zLoc < 0) ? 5 : faultyEquation;
		}

		// Make sure there are numbers in the equation.
		for (validNum in validNumbers.split("")) {
			if (equation.indexOf(validNum) > -1) {
				quickFaulty = false;
			}
		}
		faultyEquation = (quickFaulty) ? 6 : faultyEquation;
		if (faultyEquation < 1) {
			console.log("No errors detected with given equation.");
		} else {
			console.log("Equation is faulty. Here is the error ID (check on the source code to identify):" + faultyEquation);
		}

		// Find out what linear form this input is in.
		// TODO: Make a more complicated detection algorithm that uses three arrays.
		if (xLoc < equalsLoc) {
			// Standard form detected.
			console.log("Standard form detected.");

			// Regex it to return only numbers.
			regexString = /([0-9.\/]*) ? ?x ? ?\+ ? ?([\+\-]*) ? ?([0-9.\/]*) ? ?y ? ?\= ? ?([\+\-]*) ? ?([0-9.\/]*)/g;

			while ((match = regexString.exec(equation)) !== null) {
				if (match.index === regexString.lastIndex) {
					regexString.lastIndex++;
				}
				matches = [
					match[1], // This is A in: Ax + By = C.
					match[2], // This is either + or - in: Ax +/- By = C.
					match[3], // This is B in: Ax + By = C.
					match[4], // This is either + or - in: Ax + By = +/- C.
					match[5]  // This is C in: Ax + By = C.
				];
			}

			// Process the matches to remove unnecessary characters.
			finalAns.a = Number(matches[0]);
			finalAns.b = (matches[1] === "-") ? Number(matches[1] + matches[2]) : Number(matches[2]);
			finalAns.c = (matches[3] === "-") ? Number(matches[3] + matches[4]) : Number(matches[4]);
		} else if (plusLoc > equalsLoc && minusLoc > equalsLoc) {
			// Y-intercept form detected.
			console.log("Y-intercept form detected.");

			// Find the slope and y-intercept.
			regexString = /y ? ?= ? ?([\+\-]*) ? ?([0-9.\/]*) ? ?x ? ?([\+\-]*) ? ?([0-9.\/]*)/g;
			while ((match = regexString.exec(equation)) !== null) {
				if (match.index === regexString.lastIndex) {
					regexString.lastIndex++;
				}

				matches = [
					match[1], // This is either + or - in: y = +/- mx + b.
					match[2], // This is m in: y = mx + b.
					match[3], // This is either + or - in: y = mx +/- b.
					match[4]  // This is b in: y = mx + b.
				];
			}

			// Process the matches to remove unnecessary characters.
			finalAns.slope = (matches[0] === "-") ? (matches[0] + matches[1]) : matches[1];
			finalAns.b = (matches[2] === "-") ? (matches[2] + matches[3]) : matches[3];

			// Convert to standard form. TODO
		} else if (plusLoc < equalsLoc || minusLoc < equalsLoc) {
			// Point-slope form detected.
			console.log("Point-slope form detected.");

			// Find the y1, slope, and x1.
			regexString = /y ? ?\+?([\+\-]*) ? ?([0-9.\/]*) ? ?= ? ?([\+\-]*) ? ?([0-9.\/]*) ? ?\( ? ?x ? ?([\+\-]*) ? ?([0-9.\/]*) ? ?\)/g;
			while ((match = regexString.exec(equation)) !== null) {
				if (match.index === regexString.lastIndex) {
					regexString.lastIndex++;
				}

				matches = [
					match[1], // This is either + or - in: y +/- y1 = m(x - x1).
					match[2], // This is y1 in: y - y1 = m(x - x1).
					match[3], // This is either + or - in: y - y1 = +/- m(x - x1).
					match[4], // This is m in: y - y1 = m(x - x1).
					match[5], // This is either + or - in: y - y1 = m(x +/- x1).
					match[6]  // This is x1 in: y - y1 = m(x - x1).
				];
			}

			// Process the matches to remove unnecessary characters.
			finalAns.y1 = (matches[0] === "-") ? (matches[0] + matches[1]) : matches[1];
			finalAns.slope = (matches[2] === "-") ? matches[2] + matches[3] : matches[3];
			finalAns.x1 = (matches[4] === "-") ? (matches[4] + matches[5]) : matches[5];

			// Convert to standard form. TODO
		}

		return finalAns;
	}
}

// When the user submits the form, do the magic.
$form.submit(function formSubmittedDom () {
	if ($("input:radio[name=numEquations]").eq(2).is(":checked")) {
		// Three equations.
		verifyEquations($fEqIn1.val(), $fEqIn2.val(), $fEqIn3.val(), 3);
		result = regexOps($fEqIn1.val(), $fEqIn2.val(), $fEqIn3.val(), 3);
		console.log(result);
	} else if ($("input:radio[name=numEquations]").eq(1).is(":checked")) {
		// Two equations.
		verifyEquations($fEqIn1.val(), $fEqIn2.val(), 2);
		result = regexOps($fEqIn1.val(), $fEqIn2.val(), 2);
		console.log(result);
	} else {
		// One equation.
		verifyEquations($fEqIn1.val(), 1);
		result = regexOps($fEqIn1.val(), 1);
		console.log(result);
	}

	return false;
});