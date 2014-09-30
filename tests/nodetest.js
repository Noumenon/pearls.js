var ns = require('./../function');

var f = ns.lambda("(a1,b2,c3,d4) => a1*b2*c3*d4");
var g = ns.lambda("( n ) => n % 2 == 0");
var h = ns.lambda(" n => n % 2 == 0");
var i = ns.lambda(" n => { return n % 2 == 0 } ");
var j = ns.lambda(" n => return n % 2 == 0 ");
var k = ns.lambda("(n)=>{return n % 2 == 0}");
var ff = ns.lambda("n => m => m * n");

			
console.log(f(1,2,3,4));

 var fff = ff(3);

console.log(fff(4));