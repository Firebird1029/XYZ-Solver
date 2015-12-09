/* global gus garry:true */
/* eslint no-warning-comments: [1, {terms: [todo, fix, help], location: anywhere}] */

// y = mx +b
var equation = [1, 1];
var equation2 = [-1, 3];

var solve = function(equation, equation2) {

	var m = equation[0] - equation2[0];
	var b = -1*(equation[1] - equation2[1]);

	var xSolution = b/m;
	var ySolution = (equation[0] *xSolution) +  equation[1];

	var x = new Fraction(xSolution);
	var result = x.toFraction(true);
	var y = new Fraction(ySolution);
	var result2 = x.toFraction(true);

	console.log(result +" " +result2)
}

solve(equation,equation2);