// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


//agregar ngCordovaBeacon
angular.module('starter', ['ionic', 'ui.router', 'ngCordovaBeacon'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('principal', {
      url: "/",
      templateUrl: "templates/principal.html",
      controller: 'MainController'
    })
    .state('beacons', {
      url: '/beacons',
      templateUrl: 'templates/beacons.html',
      controller: 'BeaconsController'
    })
    .state('cargandoNodos', {
      url: '/cargando-nodos',
      templateUrl: 'templates/cargando-nodos.html',
      controller: 'NodesController',
      controllerAs: 'Nodos'
    })
    .state('eligiendoNodoDestino', {
      url: '/elegir-nodo-destino',
      templateUrl: 'templates/elegir-nodo-destino.html',
      controller: 'cargarDestinoController',
      controllerAs: 'Destino'
    })
    .state('elegirDestino', {
      url: '/elegirDestino',
      templateUrl: 'templates/guia.html',
      controller: 'GuidanceController'
    });

});
