"use strict";
/* global Fraction */
/* eslint no-warning-comments: [1, { "terms": ["todo", "fix", "help", "manual"], "location": "anywhere" }] */

var canvas = $("#canvas"), // The DOM canvas element.
	ctx, // The object used to draw in canvas in Javascript.
	cHeight,
	cWidth,

	i;

// If canvas is not supported.
if (!canvas.getContext) {
	//
}

// If canvas is supported, continue.
ctx = canvas[0].getContext("2d");
cHeight = canvas.height();
cWidth = canvas.width();
console.log(cWidth, cHeight);

for (var i = 1; i < 21; i++) {
	console.log("Start of for loop:", cWidth, cHeight);
	ctx.beginPath();
	ctx.moveTo((cWidth * i / 20), 0);
	ctx.lineTo((cWidth * i / 20), cHeight);
	ctx.strokeStyle = "gray";
	ctx.stroke();
	ctx.closePath();
	console.log("End of for loop:", (cWidth * i / 20), cHeight, i);
}
console.log("Finished.");