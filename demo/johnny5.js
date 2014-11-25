
var five = require("johnny-five");
var Spark = require("spark-io");
var pkg = require('../package');

// console.log( pkg.spark );

var board = new five.Board({
  io: new Spark( pkg.spark )
});

board.on("ready", function() {
  var led = new five.Led("D6");
  led.blink();
  // led.on();
});