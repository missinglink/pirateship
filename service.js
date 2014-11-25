
var five = require("johnny-five");
var Spark = require("spark-io");
var pkg = require('./package');

function Service(){
  this.board = new five.Board({ io: new Spark( pkg.spark ) });
  this.leds = {};

  this.ready = false;
  this.board.on('ready', function() {
    console.log( 'device ready' );
    this.ready = true;
  }.bind(this));
}

Service.prototype.load = function( pin, type ){
  if( !this.ready ) return console.error( 'not connected to device' );
  if( !this.leds.hasOwnProperty( pin ) ){
    console.log( 'create five.' + type + '(' + pin + ')' );
    this.leds[pin] = new five[type]( pin );
  }
  return this.leds[pin];
};

module.exports = new Service();