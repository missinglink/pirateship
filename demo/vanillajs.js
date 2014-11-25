
var Spark = require("spark-io");
var pkg = require('../package');

// console.log( pkg.spark );
var board = new Spark( pkg.spark );

board.on("ready", function() {
  console.log("CONNECTED");
  this.pinMode("D7", this.MODES.OUTPUT);

  var byte = 0;

  // This will "blink" the on board led
  setInterval(function() {
    this.digitalWrite("D7", (byte ^= 1));
  }.bind(this), 500);
});