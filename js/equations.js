"use strict";
/* global Fraction */
/* eslint no-warning-comments: [2, { "terms": ["todo", "fix", "help"], "location": "anywhere" }] */

/*
// useTwo or useThree will change to true if it is selected in the form
var useTwo = false;
var useThree = true;

// the equations
var equation = [1, 1];
var equation2 = [-1, 3];

// x + y + z = a
var e1 = [1, 2, 3, 1];
var e2 = [-1, -1, 3, 2];
var e3 = [-6, 1, 1, -2];
*/

/*function toStandard (eq1, eq2) {
	// in y = mx + b form --> ax + b = c (where a,b,c are all integers and a ≠ negative number)

	var output = [],
		// fractional form of m
		fractionm = new Fraction(eq1),
		resultm = fractionm.toFraction(true),
		denom = (fractionm.d),
		// fractional form of b
		fractionb = new Fraction(eq2),
		resultb = fractionb.toFraction(true),
		denob = (fractionb.d),
		// least common multiple
		lCm;

	// function to tell if this is an integer
	function isInt (num) {
		return typeof (num, "Number") && num % 1 === 0;
	}
	// check if the number is an integer
	if (isInt(eq1) && isInt(eq2)) {
		// if the x is not negative
		if (eq1 >= 0) {
			output.push(eq1, -1, -eq2);
		} else {
		// if the x is negative
			output.push(-eq1, 1, eq2);
		}
	} else if (isInt(eq1) && !isInt(eq2)) {
		// when the b is a fraction
		if (eq1 >= 0) {
			output.push((eq1 * denob), -denob, -1 * (eq2 * denob));
		} else {
		// if the x is negative
			output.push(-1 * (eq1 * denob), denob, (eq2 * denob));
		}
	} else if (!isInt(eq1) && isInt(eq2)) {
		// when m is a fraction
		if (eq1 >= 0) {
			output.push((eq1 * denom), -denom, -1 * (eq2 * denom));
		} else {
		// if the x is negative
			output.push(-1 * (eq1 * denom), denom, (eq2 * denom));
		}
	} else {
		// when m and b are fractions
		console.log(lCm);
		if (eq1 >= 0) {
			output.push((eq1 * denom), -denom, -1 * (eq2 * denom));
		} else {
		// if the x is negative
			output.push(-1 * (eq1 * denom), denom, (eq2 * denom));
		}
	}
	console.log(output)
	return output;
}
toStandard(0.2321, 3);*/

// converts standard to y = mx + b
function toYintercept (xval, yval, bval) {
	var yIntercept = [];
	yIntercept.push(-(xval / yval));
	yIntercept.push(bval/yval);
	return yIntercept;
}

// the function for two equations
function twoEquations (equation, equation2) {
	// y = mx +b
	// solve for each side
	var solvem = equation[0] - equation2[0],
		solveb = -1 * (equation[1] - equation2[1]),

	// get the x and the y using the the solved sides.
		xSolution = solveb / solvem,
		ySolution = (equation[0] * xSolution) + equation[1],

	// show as a fraction
		showx = new Fraction(xSolution),
		result = showx.toFraction(true),

		showy = new Fraction(ySolution),
		result2 = showy.toFraction(true),

	// object to return x and y
		answer = {};

	// display the result
	console.log(result + " " + result2);
	// useTwo = false;

	// add the answer to the object
	answer.xVal = result;
	answer.yVal = result2;

	return answer;
}

// the function for three equations
function threeEquations (equation1, equation2, equation3) {
	// array containing all the  numbers
	var array = [
		[
			[], [], []
		],
		[
			[], [], []
		],
		[
			[], [], []
		],
		[], []
		],
		solvex,
		solvey,
		solvez,
		showx,
		showy,
		showz,
		resultx,
		resulty,
		resultz,
		answer = {};

	// remove the x from the first equation and push it to array[0][2]

	// array[0][0].push(e1[0] * e2[0]);
	array[0][0].push(equation1[1] * equation2[0]);
	array[0][0].push(equation1[2] * equation2[0]);
	array[0][0].push(equation1[3] * equation2[0]);

	// array[0][1].push(e2[0] * e1[0]);
	array[0][1].push(equation2[1] * equation1[0]);
	array[0][1].push(equation2[2] * equation1[0]);
	array[0][1].push(equation2[3] * equation1[0]);

	array[0][2].push(array[0][0][0] - array[0][1][0]);
	array[0][2].push(array[0][0][1] - array[0][1][1]);
	array[0][2].push(array[0][0][2] - array[0][1][2]);

	// remove x from another equation and push it to array[1][2]

	// array[1][0].push(e1[0] * e2[0]);
	array[1][0].push(equation1[1] * equation3[0]);
	array[1][0].push(equation1[2] * equation3[0]);
	array[1][0].push(equation1[3] * equation3[0]);

	// array[1][1].push(e3[0] * e1[0]);
	array[1][1].push(equation3[1] * equation1[0]);
	array[1][1].push(equation3[2] * equation1[0]);
	array[1][1].push(equation3[3] * equation1[0]);

	array[1][2].push(array[1][0][0] - array[1][1][0]);
	array[1][2].push(array[1][0][1] - array[1][1][1]);
	array[1][2].push(array[1][0][2] - array[1][1][2]);

	// then remove the y by subtracting the two equations we got from above, push it to array[2][2]
	array[2][0].push(array[0][2][0] * array[1][2][0]);
	array[2][0].push(array[0][2][1] * array[1][2][0]);
	array[2][0].push(array[0][2][2] * array[1][2][0]);

	array[2][1].push(array[1][2][0] * array[0][2][0]);
	array[2][1].push(array[1][2][1] * array[0][2][0]);
	array[2][1].push(array[1][2][2] * array[0][2][0]);

	// array[2][2].push(array[2][0][1] - array[2][1][1]);
	array[2][2].push(array[2][0][1] - array[2][1][1]);
	array[2][2].push(array[2][0][2] - array[2][1][2]);

	// solve for z
	solvez = array[2][2][1] / array[2][2][0];

	// use z to solve for y by pluging it into an equation above
	array[3].push(array[0][2][0]);
	array[3].push(array[0][2][1] * solvez);
	array[3].push(array[0][2][2]);

	// solve for y
	solvey = (array[3][2] - array[3][1]) / array[3][0];

	// use y and z to find x
	array[4].push(equation1[0]);
	array[4].push(equation1[1] * solvey);
	array[4].push(equation1[2] * solvez);
	array[4].push(equation1[3]);

	// solve for x
	solvex = (array[4][3] - (array[4][1] + array[4][2])) / array[4][0];

	// display the result as a fraction
	showx = new Fraction(solvex);
	resultx = showx.toFraction(true);

	showy = new Fraction(solvey);
	resulty = showy.toFraction(true);

	showz = new Fraction(solvez);
	resultz = showz.toFraction(true);

	// shows the answer in {(x,y,z)}
	console.log("Answer: {(" + resultx + ", " + resulty + ", " + resultz + ")}");

	// double-checking
	console.log(equation1[0] * solvex + equation1[1] * solvey + equation1[2] * solvez);
	console.log(equation2[0] * solvex + equation2[1] * solvey + equation2[2] * solvez);
	console.log(equation3[0] * solvex + equation3[1] * solvey + equation3[2] * solvez);

	// add the answer to the object
	answer.xVal = resultx;
	answer.yVal = resulty;
	answer.zVal = resultz;

	// useTwo = false;
	return answer;
}

/*
// add && when the submit button is clicked
if (useTwo == true) {
	twoEquations(equation,equation2);
}
if (useThree == true) {
	threeEquations(e1,e2,e3);
}
*/