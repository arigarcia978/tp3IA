function ControladorGestionarMapa() {
	this.mapa = new Mapa();
	this.ultimoNodo = {};
}

ControladorGestionarMapa.prototype.inicializarMapa = function(datosBeacons, angulo){
	var beacon = new Beacon(datosBeacons.uuid, datosBeacons.major, datosBeacons.minor);
	var distanciaABeacon = datosBeacons.accuracy;
	this.cargarBeaconsIniciales(beacon, distanciaABeacon, angulo);
	
}
ControladorGestionarMapa.prototype.cargarBeaconsIniciales = function(beacon, distanciaABeacon, angulo){
	var posicion;
	if(!this.mapa.hayBeaconsCargados()){
		this.mapa.desfasaje = angulo;
		posicion = new Posicion(distanciaABeacon, 0);
	} else {
		var anguloRelativo = angulo - this.mapa.desfasaje;
		var y = Math.sin(anguloRelativo)*distanciaABeacon;
		var x = Math.cos(anguloRelativo)*distanciaABeacon;
		if(anguloRelativo >= 0 && anguloRelativo <= 180) {
			if(anguloRelativo <= 90 || anguloRelativo >= 270){
				posicion = new Posicion(x, y);
			} else {
				posicion = new Posicion(-x, y);
			}
		} else {
			if(anguloRelativo <= 90 || anguloRelativo >= 270){
				posicion = new Posicion(x, -y);
			} else {
				posicion = new Posicion(-x, -y);
			}
		}
	}
	beacon.setPosicion(posicion);
	this.mapa.addBeacon(beacon);
}
ControladorGestionarMapa.prototype.guardarPuntoIntermedio = function(beaconsVisibles){
	var posicionActual = getPosicionActual(beaconsVisibles);
}

ControladorGestionarMapa.prototype.guardarPuntoDestino = function(beaconsVisibles){
	var posicionActual = getPosicionActual(beaconsVisibles);
	//seleccionar lugar relacionado
}

ControladorGestionarMapa.prototype.getPosicionActual = function (beaconsVisibles){
	var arrayBeacons = this.getBeaconsGuardadosMasCercanos(beaconsVisibles);

	var puntos = [];
	for(i = 0; i < 3; i++){
		var beacon = arrayBeacons[i];
		var valorUnico = beacon.uuid + beacon.major + beacon.minor;
		var posicionBeacon = this.mapa.getPosicionDeBeacon(valorUnico);
		var punto = { x: posicionBeacon.x, y: posicionBeacon.y, z: 0, r: arrayBeacons[i].accuracy+1 };
		puntos.push(punto);
	}

	return this.getPuntoDePosicionActual(puntos);

}
ControladorGestionarMapa.prototype.getBeaconsGuardadosMasCercanos = function(beaconsVisibles){
	var arrayBeacons = [];

	for(b in beaconsVisibles){
		var beacon = beaconsVisibles[b].beacon;
		if(this.comprobarSiBeaconYaSeCargo(beacon)){
			arrayBeacons.push(beacon);
		}
	}

	arrayBeacons.sort(
		function(a, b){
			//return b.accuracy - a.accuracy
			if(a.accuracy < b.accuracy){
				return -1;
			}
			if(a.accuracy > b.accuracy){
				return 1;
			}
			return 0;
		}
	);
	return arrayBeacons;
}
ControladorGestionarMapa.prototype.comprobarSiBeaconYaSeCargo = function(datosBeacon){
	var beacon;
	if(typeof datosBeacon == Beacon){
		beacon = datosBeacon;
	} else {
		beacon = new Beacon(datosBeacon.uuid, datosBeacon.major, datosBeacon.minor);
	}
	return this.mapa.beaconCargado(beacon);
}
ControladorGestionarMapa.prototype.getPuntoDePosicionActual = function(puntos){
	var p4 = trilaterate(puntos[0], puntos[1], puntos[2], true);
	
	if(p4 != undefined){
		var posicionActual = new Posicion(p4.x, p4.y);
		return posicionActual;
	} else {
		console.log('no puede trilaterizar');
	}
}
ControladorGestionarMapa.prototype.mapaInicializado = function(){
	return this.mapa.beacons.length == 3;
}
ControladorGestionarMapa.prototype.getMapa = function(){
	return this.mapa;
}
var controladorGestionarMapa = new ControladorGestionarMapa();