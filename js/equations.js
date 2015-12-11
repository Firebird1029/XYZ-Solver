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

// the function for two equations
function twoEquations (equation, equation2) {
	// y = mx +b
	var solve = function solve () {
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
			result2 = showy.toFraction(true);

		// display the result
		console.log(result + " " + result2);
	};
	solve(equation, equation2);
	// useTwo = false;
}

// the function for three equations
function threeEquations (equation1, equation2, equation3) {
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
			solvex,
			solvey,
			solvez,
			showx,
			showy,
			showz,
			resultx,
			resulty,
			resultz;
		// the first part of removing the variable
		var firstP = function firstP () {
			// get rid of x

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
		};
		// the first part of removing the variable
		var secondP = function secondP () {
			// get rid of x

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
		};

		firstP();
		secondP();

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
	};
	solve(equation1, equation2, equation3);
	// useTwo = false;
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