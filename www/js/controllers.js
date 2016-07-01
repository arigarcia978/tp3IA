var beaconsHardcodeado = {
	'b9407f30-f5f8-466e-aff9-25556b57fe6d:53423:34137': 'Ari linda',
	'b9407f30-f5f8-466e-aff9-25556b57fe6d:35580:32597': 'frankits',
	'b9407f30-f5f8-466e-aff9-25556b57fe6d:43805:16417': 'lean',
	'b9407f30-f5f8-466e-aff9-25556b57fe6d:64629:15988': 'ari2',
	'b9407f30-f5f8-466e-aff9-25556b57fe6d:22210:7642': 'matias gay',
	'b9407f30-f5f8-466e-aff9-25556b57fe6d:46778:1037': 'muak',
	"b9407f30-f5f8-466e-aff9-25556b57fe6d:22213:7609": 'trucho'
}
var beacons = {};
/*
	beacons["b9407f30-f5f8-466e-aff9-25556b57fe6d:53423:34137"] = {
		nombre: beaconsHardcodeado["b9407f30-f5f8-466e-aff9-25556b57fe6d:53423:34137"],
		beacon: {
			accuracy: 28,
			major: "53423",
			minor: "34137",
			proximity: "ProximityNear",
			rssi: -61,
			tx: -60,
			uuid: "b9407f30-f5f8-466e-aff9-25556b57fe6d"
		}
	}
	beacons["b9407f30-f5f8-466e-aff9-25556b57fe6d:22210:7642"] = {
		nombre: beaconsHardcodeado["b9407f30-f5f8-466e-aff9-25556b57fe6d:22210:7642"],
		beacon: {
			accuracy: 29.5,
			major: "22210",
			minor: "7642",
			proximity: "ProximityNear",
			rssi: -88,
			tx: -60,
			uuid: "b9407f30-f5f8-466e-aff9-25556b57fe6d"
		}
	}
	beacons["b9407f30-f5f8-466e-aff9-25556b57fe6d:22213:7609"] = {
		nombre: beaconsHardcodeado["b9407f30-f5f8-466e-aff9-25556b57fe6d:22213:7609"],
		beacon: {
			accuracy: 29,
			major: '22213',
			minor: '7609',
			proximity: "ProximityNear",
			rssi: -90,
			tx: -60,
			uuid: "b9407f30-f5f8-466e-aff9-25556b57fe6d"
		}
	}
*/
angular.module('starter')
	.controller('MainController', ['$scope', function($scope){
		
	}])
	.controller('BeaconsController', ['$scope', '$rootScope', '$ionicPopup', 'BeaconsSeaker', 
		function($scope, $rootScope, $ionicPopup, BeaconsSeaker) {
			
			function buscarBeacons(){
				BeaconsSeaker.findBeacons();
				$scope.beacons = $rootScope.beacons;

				setInterval(function(){
					$scope.$apply();
				}, 3000);
			}
			buscarBeacons();
			
			//$scope.beacons = beacons;
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
				$scope.getPosicion();
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
	    		if(controladorGestionarMapa.mapaInicializado()){
					setInterval($scope.getPosicionActual, 500);
				}
			}
			$scope.getPosicionActual = function(){
				var posicion = controladorGestionarMapa.getPosicionActual($scope.beacons);
				if(posicion != undefined){
					$scope.posicion = posicion;
				}
			}
		}])
	.controller('NodesController', ['cargandoNodos', 'BeaconsSeaker', '$scope', '$rootScope',
		function(cargando, BeaconsSeaker, $scope, $rootScope) {
			setInterval(getPosicion, 1000);
			var contexto = this;

			function buscarBeacons(){
					BeaconsSeaker.findBeacons();
					$scope.beacons = $rootScope.beacons;

					setInterval(function(){
						$scope.$apply();
					}, 3000);
				}
				buscarBeacons();

			function getPosicion(){
				var posicion = controladorGestionarMapa.getPosicionActual($scope.beacons)

				if(posicion != undefined){
					contexto.posicionActual = posicion;
					console.log(contexto.posicionActual);
					controladorGestionarCaminos.comprobarSiSeEncuentraEnUnNodo(contexto.posicionActual);	
				}
			}

			this.agregarNodoIntermedio = function() {
				var posicion = this.posicionActual;
				controladorGestionarCaminos.agregarNodoIntermedio(posicion);
				controladorGestionarCaminos.comprobarSiSeEncuentraEnUnNodo(posicionActual);	
			}

			this.agregarNodoDestino = function() {
				var posicion = this.posicionActual;
				var ahora = this.posicionActual;
				cargando.setPosicion(ahora);
			}
	}])
	.controller('cargarDestinoController', ['cargandoNodos', '$location', function(cargando, $location) {
		
		this.posicion = cargando.getPosicion();
		this.lugares = lugares;

		this.elegirLugar = function(lugar) {
			delete lugar.$$hashKey;
			controladorGestionarCaminos.agregarNodoDestino(this.posicion, lugar);
			$location.path('/cargando-nodos');
		}
	}])
	.controller('GuidanceController', ['BeaconsSeaker', '$rootScope', '$scope',
		function(BeaconsSeaker, $rootScope, $scope){
			function buscarBeacons(){
				BeaconsSeaker.findBeacons();
				$scope.beacons = $rootScope.beacons;

				setInterval(function(){
					$scope.$apply();
				}, 3000);
			}
			buscarBeacons();
			setInterval(getAngulo, 300);

			function getAngulo(){
	      		navigator.compass.getCurrentHeading(
	        		function(data) {
	        			$scope.compass = data.magneticHeading;
	        		},
	        		function(error){
	          			console.log(error);
	        		});
	    	}

			$scope.lugarDeDestinoSeleccionado = function(lugar){
				$scope.posicion = controladorGestionarMapa.getPosicionActual($scope.beacons);
				controladorGuia.irA(lugar, posicion, $scope.compass);
				setInterval(getAnguloDeDireccion, 1000);
			}

			function getAnguloDeDireccion(){
				$scope.angulo = controladorGuia.comprobarElCamino($scope.posicion, $scope.angulo);
			}
		}
	]);


angular.module('starter').factory('cargandoNodos', function() {
	var posicion;

	return {
		setPosicion: function(nuevaPosicion) {
			posicion = nuevaPosicion;
		},
		getPosicion: function() {
			return posicion;
		}
	}
});

