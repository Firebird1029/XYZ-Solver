/* global gus garry:true */
/* eslint no-warning-comments: [1, {terms: [todo, fix, help], location: anywhere}] */

// useTwo or useThree will change to true if it is selected in the form
var useTwo = false;
var useThree = false;

//the equations

var equation = [1, 1];
var equation2 = [-1, 3];

// x + y + z = a
var e1 = [4, 2, -3, 6];
var e2 = [1, -4, 1, -4];
var e3 = [-1, 0, 2, 2];

// the function for two equations
var twoEquations = function(equation,equation2) {
	// y = mx +b
	var solve = function() {

		var m = equation[0] - equation2[0];
		var b = -1*(equation[1] - equation2[1]);

		var xSolution = b/m;
		var ySolution = (equation[0] *xSolution) +  equation[1];

		var x = new Fraction(xSolution);
		var result = x.toFraction(true);
		var y = new Fraction(ySolution);
		var result2 = x.toFraction(true);

		console.log(result +" " +result2);
	}
	solve(equation,equation2);
	useTwo = false;
}

// the function for three equations
var threeEquations = function(e1, e2, e3) {

	var x, y, z;

	var solve = function() {
		// first remove one variable
		var rem1 = [];
		var rem2 = [];
		var rem3 = [];

		//repeat by removing the same variable
		var rem4 = [];
		var rem5 = [];
		var rem6 = [];

		//subtract to find z
		var z1 = [];
		var z2 = [];
		var z3 = [];

		// put z in to solve for y
		var y1 = [];

		// put all the variables in to get x
		var x1 = [];

		var firstP = function() {
			//get rid of x

			//rem1.push(e1[0]*e2[0]);
			rem1.push(e1[1]*e2[0]);
			rem1.push(e1[2]*e2[0]);
			rem1.push(e1[3]*e2[0]);

			//rem2.push(e2[0]*e1[0]);
			rem2.push(e2[1]*e1[0]);
			rem2.push(e2[2]*e1[0]);
			rem2.push(e2[3]*e1[0]);

			rem3.push(rem1[0] - rem2[0])
			rem3.push(rem1[1] - rem2[1])
			rem3.push(rem1[2] - rem2[2])
		}

		var secondP = function() {
			//get rid of x

			//rem4.push(e1[0]*e2[0]);
			rem4.push(e1[1]*e3[0]);
			rem4.push(e1[2]*e3[0]);
			rem4.push(e1[3]*e3[0]);

			//rem5.push(e3[0]*e1[0]);
			rem5.push(e3[1]*e1[0]);
			rem5.push(e3[2]*e1[0]);
			rem5.push(e3[3]*e1[0]);

			rem6.push(rem4[0] - rem5[0]);
			rem6.push(rem4[1] - rem5[1]);
			rem6.push(rem4[2] - rem5[2]);
		}

		firstP();
		secondP();

		z1.push(rem3[0]*rem6[0]);
		z1.push(rem3[1]*rem6[0]);
		z1.push(rem3[2]*rem6[0]);

		z2.push(rem6[0]*rem3[0]);
		z2.push(rem6[1]*rem3[0]);
		z2.push(rem6[2]*rem3[0]);

		//f3.push(f1[0]-f2[0]);
		z3.push(z1[1]-z2[1]);
		z3.push(z1[2]-z2[2]);

		// solve for z
		z = z3[1]/z3[0];
		console.log(z + " " + "z");

		y1.push(rem3[0]);
		y1.push(rem3[1]*z);
		y1.push(rem3[2]);

		// solve for y
		y = (y1[2]-y1[1])/y1[0];
		console.log(y + " " + "y");

		// use y and z to find x
		x1.push(e1[0]);
		x1.push(e1[1]*y);
		x1.push(e1[2]*z);
		x1.push(e1[3]);

		// solve for x
		x = (x1[3]-(x1[1]+x1[2]))/x1[0];
		console.log(x + " " + "x");

		// shows the answer in {(x,y,z)}
		console.log("Answer: {(" + x + ", " + y +", " + z + ")}");

		//double-checking
		console.log(e1[0]*x + e1[1]*y + e1[2]*z)
		console.log(e2[0]*x + e2[1]*y + e2[2]*z)
		console.log(e3[0]*x + e3[1]*y + e3[2]*z)

	}
	solve (e1, e2, e3);
	useTwo = false;
}

// add && when the submit button is clicked

if (useTwo == true) {
	twoEquations(equation,equation2);
}
if (useThree == true) {
	useThreeEquations(e1,e2,e3);
}