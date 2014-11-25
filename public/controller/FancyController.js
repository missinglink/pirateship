
app.controller('FancyController', ['$scope','$http', function( $scope, $http ) {

  var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
  var socket = io(full);
  // socket.on('news', function (data) {
  //   console.log(data);
  //   socket.emit('my other event', { my: 'data' });
  // });

  function objectify( e ){
    var o = {};
    o.absolute = e.absolute || true;
    o.alpha = e.alpha || 0;
    o.beta = e.beta || 0;
    o.gamma = e.gamma || 0;
    o.heading = e.compassHeading || e.webkitCompassHeading || 0;
    o.accuracy = e.compassAccuracy || e.webkitCompassAccuracy || 0;
    o.portrait = !window.orientation;
    return o;
  }

  window.addEventListener('deviceorientation', function (e) {

    var o = objectify(e);

    // skip invalid data (non-mobile devices)
    if( !o.alpha && !o.beta && !o.gamma ) return;

    socket.emit('orientation', o);

    $scope.$apply( function(){
      $scope.orientation = o;
    });

  }, false);

  $scope.trigger = function( pin, type, action, val ){

    $http.get( ['','api',pin,type,action,val ].join('/') )
      .success(function(data, status, headers, config) {
        console.log( 'success' );
      })
      .error(function(data, status, headers, config) {
        console.log( 'error' );
      });
  };

}]);