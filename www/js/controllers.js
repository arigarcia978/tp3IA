angular.module('starter')
	.controller('MainController', ['$scope', function($scope){
	}])

	.controller('BeaconsController', ['$scope', '$rootScope', '$ionicPlatform', '$cordovaBeacon', '$ionicPopup', '$timeout',
		function($scope, $rootScope, $ionicPlatform, $cordovaBeacon, $ionicPopup, $timeout){
			$scope.beacons = {};
		    $ionicPlatform.ready(function() {
		        $cordovaBeacon.requestWhenInUseAuthorization();
		        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, resultado) {
		            var beacons = resultado.beacons;
		            var valorUnico;
		            for(var i = 0; i < beacons.length; i++) {
		                valorUnico = beacons[i].uuid + ":" + beacons[i].major + ":" + beacons[i].minor;
		                $scope.beacons[valorUnico] = beacons[i];
		                console.log(beacons)
		            }
		            $scope.$apply();
		        });
		        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));
			});

			$scope.beaconSeleccionado = function(beaconSeleccionado){
				beacon = beaconSeleccionado;
				console.log('elegiste el beacon ');
				console.log(beacon);
				intervalo = setInterval(getAngulo, 500);
				$scope.showPopup(guardarBeacon);
				//setTimeout(guardarBeacon(beacon), 5005);
			}

			function guardarBeacon(beacon){
				console.log(beacon);
				console.log($scope.angulo);
				console.log('se ha guardado el beacon');
			}

			$scope.showPopup = function(callback) {
			  $scope.data = {};

			  // An elaborate, custom popup
			  var myPopup = $ionicPopup.show({
			    title: 'Compass',
			    subTitle: 'Necesitamos que no te muevas y apuntes al beacon que estas guardando.',
			    scope: $scope
			  });

			  myPopup.then(function(res) {
			    console.log('Tapped!', res);
			  });

			  $timeout(function() {
			     myPopup.close(); //close the popup after 3 seconds for some reason
			     clearInterval(intervalo);
			     callback(beacon);
			  }, 5000);
			 };

	    function getAngulo(){
	      console.log('estoy aqui en get angulo');
	      navigator.compass.getCurrentHeading(
	        function(data) {
	        	console.log(data);
	          	$scope.angulo = data.magneticHeading;
	        },
	        function(error){
	          console.log(error);
	        });
	    }
		}])