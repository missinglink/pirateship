
var app = angular.module( 'pirate', [ 'ngRoute' ] );

// Routes
app.config( function( $routeProvider ) {
  $routeProvider
    .when( '/', {
      controller: 'FancyController',
      templateUrl: '/partials/fancy.html'
    })
    .when( '/buttons', {
      controller: 'ButtonController',
      templateUrl: '/partials/buttons.html'
    })
    .when( '/device', {
      controller: 'DeviceController',
      templateUrl: '/partials/device.html'
    })
    .otherwise({ redirectTo: '/' });
});

app.filter("round", function () {
  return function(input, precision) {
    return input ?
      parseFloat(input).toFixed(precision) :
      "";
  };
});

// Services
// app.factory( 'CiaoService', function( Restangular ) {
//   return Restangular.withConfig( function( RestangularConfigurer ) {
//     RestangularConfigurer.setBaseUrl( '/' );
//   });
// });