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
	var x, y, z;
	var solve = function solve () {

		// first remove one variable
		var rem1 = [],
			rem2 = [],
			rem3 = [],

		// repeat by removing the same variable
			rem4 = [],
			rem5 = [],
			rem6 = [],

		// subtract to find z
			z1 = [],
			z2 = [],
			z3 = [],

		// put z in to solve for y
			y1 = [],

		// put all the variables in to get x
			x1 = [],

			showx,
			showy,
			showz,

			resultx,
			resulty,
			resultz;

		var firstP = function firstP () {
			// get rid of x

			// rem1.push(e1[0] * e2[0]);
			rem1.push(e1[1] * e2[0]);
			rem1.push(e1[2] * e2[0]);
			rem1.push(e1[3] * e2[0]);

			// rem2.push(e2[0] * e1[0]);
			rem2.push(e2[1] * e1[0]);
			rem2.push(e2[2] * e1[0]);
			rem2.push(e2[3] * e1[0]);

			rem3.push(rem1[0] - rem2[0]);
			rem3.push(rem1[1] - rem2[1]);
			rem3.push(rem1[2] - rem2[2]);
		};

		var secondP = function secondP () {
			// get rid of x

			// rem4.push(e1[0] * e2[0]);
			rem4.push(e1[1] * e3[0]);
			rem4.push(e1[2] * e3[0]);
			rem4.push(e1[3] * e3[0]);

			// rem5.push(e3[0] * e1[0]);
			rem5.push(e3[1] * e1[0]);
			rem5.push(e3[2] * e1[0]);
			rem5.push(e3[3] * e1[0]);

			rem6.push(rem4[0] - rem5[0]);
			rem6.push(rem4[1] - rem5[1]);
			rem6.push(rem4[2] - rem5[2]);
		};

		firstP();
		secondP();

		z1.push(rem3[0] * rem6[0]);
		z1.push(rem3[1] * rem6[0]);
		z1.push(rem3[2] * rem6[0]);

		z2.push(rem6[0] * rem3[0]);
		z2.push(rem6[1] * rem3[0]);
		z2.push(rem6[2] * rem3[0]);

		// f3.push(f1[0] - f2[0]);
		z3.push(z1[1] - z2[1]);
		z3.push(z1[2] - z2[2]);

		// solve for z
		z = z3[1] / z3[0];

		y1.push(rem3[0]);
		y1.push(rem3[1] * z);
		y1.push(rem3[2]);

		// solve for y
		y = (y1[2] - y1[1]) / y1[0];

		// use y and z to find x
		x1.push(e1[0]);
		x1.push(e1[1] * y);
		x1.push(e1[2] * z);
		x1.push(e1[3]);

		// solve for x
		x = (x1[3] - (x1[1] + x1[2])) / x1[0];

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