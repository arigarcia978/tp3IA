angular.module('starter')
	.factory('BeaconsSeaker', ['$ionicPlatform', '$cordovaBeacon', '$rootScope', 
		function($ionicPlatform, $cordovaBeacon, $rootScope){
			return {
				findBeacons: function(){
					$rootScope.beacons = {};
				    $ionicPlatform.ready(function() {
				        $cordovaBeacon.requestWhenInUseAuthorization();
				        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, resultado) {
				        	var beacons = resultado.beacons;
				        	var valorUnico;
				            for(var i = 0; i < beacons.length; i++) {
				                valorUnico = beacons[i].uuid + ":" + beacons[i].major + ":" + beacons[i].minor;
				                $rootScope.beacons[valorUnico] = {
				                	nombre: beaconsHardcodeado[valorUnico],
				                	beacon: beacons[i]
				                }
				            }
				        });
				        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));
					});
				}
			}
		}
	])