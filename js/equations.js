"use strict";
/* global gus garry:true */
/* eslint no-warning-comments: [1, {terms: [todo, fix, help], location: anywhere}] */

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

// the function for two equations
function twoEquations (equation, equation2) {
	// y = mx +b
	var solve = function solve () {
		// show as a fraction
		var solvem = equation[0] - equation2[0],
			solveb = -1 * (equation[1] - equation2[1]),

			xSolution = solveb / solvem,
			ySolution = (equation[0] * xSolution) + equation[1],

			x = new Fraction(xSolution),
			result = x.toFraction(true),

			y = new Fraction(ySolution),
			result2 = y.toFraction(true);

		console.log(result + " " + result2);
	};
	solve(equation, equation2);
	useTwo = false;
}

// the function for three equations
function threeEquations (e1, e2, e3) {
	var solve = function solve () {
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
			x,
			y,
			z,
			showx,
			showy,
			showz,
			resultx,
			resulty,
			resultz;
		var firstP = function firstP () {
			// get rid of x

			// array[0][0].push(e1[0] * e2[0]);
			array[0][0].push(e1[1] * e2[0]);
			array[0][0].push(e1[2] * e2[0]);
			array[0][0].push(e1[3] * e2[0]);

			// array[0][1].push(e2[0] * e1[0]);
			array[0][1].push(e2[1] * e1[0]);
			array[0][1].push(e2[2] * e1[0]);
			array[0][1].push(e2[3] * e1[0]);

			array[0][2].push(array[0][0][0] - array[0][1][0]);
			array[0][2].push(array[0][0][1] - array[0][1][1]);
			array[0][2].push(array[0][0][2] - array[0][1][2]);
		};

		var secondP = function secondP () {
			// get rid of x

			// array[1][0].push(e1[0] * e2[0]);
			array[1][0].push(e1[1] * e3[0]);
			array[1][0].push(e1[2] * e3[0]);
			array[1][0].push(e1[3] * e3[0]);

			// array[1][1].push(e3[0] * e1[0]);
			array[1][1].push(e3[1] * e1[0]);
			array[1][1].push(e3[2] * e1[0]);
			array[1][1].push(e3[3] * e1[0]);

			array[1][2].push(array[1][0][0] - array[1][1][0]);
			array[1][2].push(array[1][0][1] - array[1][1][1]);
			array[1][2].push(array[1][0][2] - array[1][1][2]);
		};

		firstP();
		secondP();

		array[2][0].push(array[0][2][0] * array[1][2][0]);
		array[2][0].push(array[0][2][1] * array[1][2][0]);
		array[2][0].push(array[0][2][2] * array[1][2][0]);

		array[2][1].push(array[1][2][0] * array[0][2][0]);
		array[2][1].push(array[1][2][1] * array[0][2][0]);
		array[2][1].push(array[1][2][2] * array[0][2][0]);

		// f3.push(f1[0] - f2[0]);
		array[2][2].push(array[2][0][1] - array[2][1][1]);
		array[2][2].push(array[2][0][2] - array[2][1][2]);

		// solve for z
		z = array[2][2][1] / array[2][2][0];

		array[3].push(array[0][2][0]);
		array[3].push(array[0][2][1] * z);
		array[3].push(array[0][2][2]);

		// solve for y
		y = (array[3][2] - array[3][1]) / array[3][0];

		// use y and z to find x
		array[4].push(e1[0]);
		array[4].push(e1[1] * y);
		array[4].push(e1[2] * z);
		array[4].push(e1[3]);

		// solve for x
		x = (array[4][3] - (array[4][1] + array[4][2])) / array[4][0];

		// shows the answer in {(x,y,z)}
		console.log("Answer: {(" + x + ", " + y + ", " + z + ")}");

		showx = new Fraction(x);
		resultx = showx.toFraction(true);

		showy = new Fraction(y);
		resulty = showy.toFraction(true);

		showz = new Fraction(z);
		resultz = showz.toFraction(true);

		// shows the answer in {(x,y,z)}
		console.log("Answer: {(" + resultx + ", " + resulty + ", " + resultz + ")}");

		// double-checking
		console.log(e1[0] * x + e1[1] * y + e1[2] * z);
		console.log(e2[0] * x + e2[1] * y + e2[2] * z);
		console.log(e3[0] * x + e3[1] * y + e3[2] * z);

	};
	solve(e1, e2, e3);
	useTwo = false;
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