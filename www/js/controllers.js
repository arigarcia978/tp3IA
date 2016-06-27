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

			var beacon;

			$scope.beaconSeleccionado = function(beaconSeleccionado){
				var beaconCargado = controladorGestionarMapa.comprobarSiBeaconYaSeCargo(beaconSeleccionado);
				if(!beaconCargado){
					beacon = beaconSeleccionado;
					$scope.angulo = 0;
					pedirAngulo();
				} else {
					$scope.showAlert('Beacon guardado previamente', function(){
						console.log('Beacon ya guardado');
					});
				}
			}

    		var beaconsHardcodeado = {
    			'b9407f30-f5f8-466e-aff9-25556b57fe6d:53423:34137': 'Ari linda',
    			'b9407f30-f5f8-466e-aff9-25556b57fe6d:35580:32597': 'Beacon2',
    			'b9407f30-f5f8-466e-aff9-25556b57fe6d:43805:16417': 'lean',
    			'b9407f30-f5f8-466e-aff9-25556b57fe6d:64629:15988': 'Beacon4',
    			'b9407f30-f5f8-466e-aff9-25556b57fe6d:22210:7642': 'matias gay',
    			'b9407f30-f5f8-466e-aff9-25556b57fe6d:46778:1037': 'Beacon6'
    		}

    		function pedirAngulo(){
    			var mensaje = 'Necesitamos que no te muevas durante 5 segundos y apuntes al beacon que estas guardando.';
    			$scope.showAlert(mensaje, medirAngulo);
    		}

			function guardarBeacon(){
				clearInterval(intervalo);
				controladorGestionarMapa.inicializarMapa(beacon, $scope.angulo);
				$scope.showAlert('Se guardo el beacon', function(){
					console.log('se ha guardado el beacon');
				});
			}

			function medirAngulo(){
				intervalo = setInterval(getAngulo, 500);
			    setTimeout(guardarBeacon, 5000);
			}

			$scope.showAlert = function(mensaje, callback) {
			   var alertPopup = $ionicPopup.alert({
			     title: 'Aviso',
			     template: mensaje
			   });

			   alertPopup.then(function(res) {
			   		callback();
			   });
			};

	    	function getAngulo(){
	      		navigator.compass.getCurrentHeading(
	        		function(data) {
	        			$scope.angulo = data.magneticHeading;
	        		},
	        		function(error){
	          			console.log(error);
	        		});
	    	}

	    	$scope.getPosicion = function(){
				var posicion = controladorGestionarMapa.getPosicionActual($scope.beacons);
				console.log(posicion);
	    	}
		}])