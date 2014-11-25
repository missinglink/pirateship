
app.controller('ButtonController', ['$scope','$http', function( $scope, $http ) {

  // console.log('load ButtonController');

  $scope.pins = {
    // 'A0': 'Led',
    // 'A1': 'Led',
    // 'A2': 'Led',
    // 'A3': 'Led',
    // 'A4': 'Led',
    // 'A5': 'Led',
    'A6': 'Motor:WeaponSpinner',
    'A7': 'Motor:MainEngine',
    'D0': 'Servo:Rudder',
    'D1': 'Servo:Weapon',
    // 'D1': 'Led',
    // 'D2': 'Led',
    // 'D3': 'Led',
    // 'D4': 'Led',
    // 'D5': 'Led',
    'D6': 'Led:Scull',
    'D7': 'Led:BuiltIn'
  };

  $scope.actions = {
    'Led': {
      'on': [''],
      'off': [''],
      'stop': [''],
      'strobe': ['100']
    },
    'Servo': {
      'sweep': [''],
      'stop': [''],
      'to': ['0','45','75','100','135','180']
    },
    'Motor': {
      'start': ['100','255'],
      'stop': ['']
    }
  };

  $scope.trigger = function( pin, type, action, val ){

    $http.get( ['','api',pin,type.split(':')[0],action,val ].join('/') )
      .success(function(data, status, headers, config) {
        console.log( 'success' );
      })
      .error(function(data, status, headers, config) {
        console.log( 'error' );
      });
  };

}]);