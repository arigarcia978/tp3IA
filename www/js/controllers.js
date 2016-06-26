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
		                $scope.beacons[valorUnico] = {
		                	nombre: beaconsHardcodeado[valorUnico],
		                	beacon: beacons[i]
		                }
		            }
		            $scope.$apply();
		        });
		        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));
			});

			$scope.beaconSeleccionado = function(beaconSeleccionado){
				beacon = beaconSeleccionado.beacon;
				console.log('elegiste el beacon ');
				console.log(beaconSeleccionado);
				$scope.angulo = 0;
				pedirAngulo();
				//intervalo = setInterval(getAngulo, 500);
				
				//setTimeout(guardarBeacon(beacon), 5005);
			}

    		var beaconsHardcodeado = {
    			'b9407f30-f5f8-466e-aff9-25556b57fe6d:53423:34137': 'Beacon1',
    			'b9407f30-f5f8-466e-aff9-25556b57fe6d:35580:32597': 'Beacon2',
    			'b9407f30-f5f8-466e-aff9-25556b57fe6d:43805:16417': 'Beacon3',
    			'b9407f30-f5f8-466e-aff9-25556b57fe6d:64629:15988': 'Beacon4',
    			'b9407f30-f5f8-466e-aff9-25556b57fe6d:22210:7642': 'Beacon5',
    			'b9407f30-f5f8-466e-aff9-25556b57fe6d:46778:1037': 'Beacon6'
    		}

    		function pedirAngulo(){
    			var mensaje = 'Necesitamos que no te muevas durante 5 segundos y apuntes al beacon que estas guardando.';
    			$scope.showAlert(mensaje, medirAngulo);
    		}

			function guardarBeacon(beacon){
				clearInterval(intervalo);
				$scope.showAlert('Se guardo el beacon', function(){
					console.log('se ha guardado el beacon');
				});
			}

			function medirAngulo(){
				intervalo = setInterval(getAngulo, 500);
			    setTimeout(guardarBeacon(beacon), 10000);
			}

			 $scope.showAlert = function(mensaje, callback) {
			   var alertPopup = $ionicPopup.alert({
			     title: 'Aviso',
			     template: mensaje
			   });

			   alertPopup.then(function(res) {
			   		console.log('el then del popup');
			   		callback();
			   		//setTimeout(callback, 10000);
			   });
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