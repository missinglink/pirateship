$(document).ready(function() {

  window.livedevice = new EventEmitter2();
  window.livedevice.id = Math.round( Math.random() * 10000000000 );
  window.livedevice.remote = true; // send stats to server
  window.livedevice._interval = undefined;

  // var me = new Firebase("https://device-orientation.firebaseio.com/")
  //           .child('device')
  //           .child(window.livedevice.id);

  // properties
  window.livedevice.agent = {};
  window.livedevice.orientation = {};
  window.livedevice.motion = {};
  window.livedevice.location = {};

  // =================== remote ===================

  // window.livedevice.setUploadInterval = function( interval ){

  //   // clear previous interval
  //   clearInterval( window.livedevice._interval );

  //   // update remote on an interval
  //   window.livedevice._interval = setInterval( function(){
  //     if( window.livedevice.remote ){
  //       me.set({
  //         timeStamp: new Date().getTime(),
  //         agent: window.livedevice.agent,
  //         orientation: window.livedevice.orientation,
  //         motion: window.livedevice.motion,
  //         location: window.livedevice.location
  //       });
  //     }
  //   }, interval );
  // }

  // window.livedevice.setUploadInterval( 1000 ); // 1s

  // =================== agent ===================
  function setAgent(e){
    window.livedevice.agent = {};
    window.livedevice.agent.appCodeName = e.appCodeName || '';
    window.livedevice.agent.appName = e.appName || '';
    window.livedevice.agent.appVersion = e.appVersion || '';
    window.livedevice.agent.cookieEnabled = e.cookieEnabled || '';
    window.livedevice.agent.language = e.language || '';
    window.livedevice.agent.onLine = e.onLine || '';
    window.livedevice.agent.platform = e.platform || '';
    window.livedevice.agent.userAgent = e.userAgent || '';
    window.livedevice.agent.systemLanguage = e.systemLanguage || '';
    // window.livedevice.agent.keys = Object.keys( e );
  }

  // send agent data to remote
  // window.livedevice.on( 'agent', function( err, agent ){
  //   if( window.livedevice.remote ){
  //     if( err ) me.child('agent').set({ error: err });
  //     else me.child('agent').set( agent );
  //   }
  // });

  // read agent data from device
  setTimeout( function(){
    setAgent(navigator);
    window.livedevice.emit( 'agent', null, window.livedevice.agent );
  }, 1000 ); // wait 1s

  // =================== orientation ===================
  function setOrientation(e){
    window.livedevice.orientation = {};
    window.livedevice.orientation.absolute = e.absolute || true;
    window.livedevice.orientation.alpha = e.alpha || 0;
    window.livedevice.orientation.beta = e.beta || 0;
    window.livedevice.orientation.gamma = e.gamma || 0;
    window.livedevice.orientation.heading = e.compassHeading || e.webkitCompassHeading || 0;
    window.livedevice.orientation.accuracy = e.compassAccuracy || e.webkitCompassAccuracy || 0;
    window.livedevice.orientation.portrait = !window.orientation;
    // window.livedevice.orientation.keys = Object.keys( e );
  }

  // send orientation data to remote
  // window.livedevice.on( 'orientation', function( err, orientation ){
  //   if( window.livedevice.remote ){
  //     if( err ) me.child('orientation').set({ error: err });
  //     else me.child('orientation').set( orientation );
  //   }
  // });

  // read orientation data from device
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function (e) {
      setOrientation(e);

      // skip invalid data (non-mobile devices)
      if( !window.livedevice.orientation.alpha &&
          !window.livedevice.orientation.beta &&
          !window.livedevice.orientation.gamma ) return;

      window.livedevice.emit( 'orientation', null, window.livedevice.orientation );
    }, false);

  } else {
    window.livedevice.emit( 'orientation', 'failed to init DeviceOrientationEvent' );
  }

  // =================== motion ===================
  function setMotion(e){
    window.livedevice.motion = {};
    window.livedevice.motion.acceleration = e.acceleration || { x: 0, y: 0, z: 0 };
  }

  // send motion data to remote
  // window.livedevice.on( 'motion', function( err, motion ){
  //   if( window.livedevice.remote ){
  //     if( err ) me.child('motion').set({ error: err });
  //     else me.child('motion').set( motion );
  //   }
  // });

  // read motion data from device
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function (e) {
      setMotion(e);

      // skip invalid data (non-mobile devices)
      if( !window.livedevice.motion.acceleration.x &&
          !window.livedevice.motion.acceleration.y &&
          !window.livedevice.motion.acceleration.z ) return;

      window.livedevice.emit( 'motion', null, window.livedevice.motion );
    }, false);
  } else {
    window.livedevice.emit( 'motion', 'failed to init DeviceMotionEvent' );
  }

  // =================== location ===================
  function setLocation(e){
    window.livedevice.location = {};
    window.livedevice.location.accuracy = e.accuracy || true;
    window.livedevice.location.altitude = e.altitude || 0;
    window.livedevice.location.altitudeAccuracy = e.altitudeAccuracy || 0;
    window.livedevice.location.heading = e.heading || 0;
    window.livedevice.location.latitude = e.latitude || 0;
    window.livedevice.location.longitude = e.longitude || 0;
    window.livedevice.location.speed = e.speed || 0;
    // window.livedevice.location.keys = Object.keys( e );
  }

  // send location data to remote
  // window.livedevice.on( 'location', function( err, location ){
  //   if( window.livedevice.remote ){
  //     if( err ) me.child('location').set({ error: err });
  //     else me.child('location').set( location );
  //   }
  // });

  // read location data from device
  if (navigator.geolocation) {
    var options = { enableHighAccuracy: true, maximumAge: 10, timeout: 60000 };
    navigator.geolocation.watchPosition( function( pos ){
      setLocation(pos.coords);

      // skip invalid data (non-mobile devices)
      if( !window.livedevice.location.altitude &&
          !window.livedevice.location.altitudeAccuracy &&
          !window.livedevice.location.heading ) return;

      window.livedevice.emit( 'location', null, window.livedevice.location );
    }, function( e ){
      window.livedevice.emit( 'location', 'location error' );
    });
  } else {
    window.livedevice.emit( 'location', 'failed to init geolocation' );
  }

});