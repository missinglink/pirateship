
var http = require('http');
var express = require('express');
var ecstatic = require('ecstatic');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var service = require('./service');

var rudderAngle = 0;
var speed = 0;
var rudder, engine;

service.board.on('ready', function() {
  rudder = service.load( 'D0', 'Servo' );
  engine = service.load( 'A7', 'Motor' );
  weapon = service.load( 'A6', 'Motor' );
  engine.stop();
  weapon.stop();
});

io.on('connection', function (socket) {

  console.log( 'client connected' );
  socket.on('orientation', function (data) {

    // not ready yet
    if( !rudder || !engine ) return;

    // gamma is rudder rotation
    if( data.gamma > -60 && data.gamma < 60 ){
      var newAngle = 90 + Math.round( data.gamma );
      if( newAngle != rudderAngle ){
        rudder.to( rudderAngle );
      }
      rudderAngle = newAngle;
    }

    var newBeta = Math.round( data.beta );
    if( newBeta > 0 ){
      var newSpeed = 255 - newBeta;
      if( newSpeed != speed ){
        engine.start( newSpeed );
      }
      speed = newSpeed;
    }

    // console.log('orientation',data.beta);
  });
});

var controller = function( req, res, next ){

  var pin = req.params.pin;
  var type = req.params.type;
  var action = req.params.action;
  var value = req.params.value;

  var i = parseInt( value, 10 );
  if( !isNaN( i ) ){ value = i; }

  console.log( 'SET', pin, action, value, typeof value );
  var led = service.load( pin, type );

  if( 'function' !== typeof led[action] ){
    return next( 'invalid action' );
  }

  led[ action ]( value );
  res.send( 'cool bro' );
};

app.get( '/api/:pin/:type/:action', controller );
app.get( '/api/:pin/:type/:action/:value', controller );

app.use(ecstatic({ root: __dirname + '/public' }));
server.listen(3000);

console.log('Listening on :3000');