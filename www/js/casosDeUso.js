function ControladorGestionarMapa() {
	this.mapa = new Mapa();
	this.ultimoNodo = {};
}

ControladorGestionarMapa.prototype.inicializarMapa = function(datosBeacons, angulo){
	var beacon = new Beacon(datosBeacons.uuid, datosBeacons.major, datosBeacons.minor);
	var distanciaABeacon = datosBeacons.accuracy;
	var posicion;
	if(this.mapa.hayBeaconsCargados()){
		this.mapa.desfasaje = angulo;
		posicion = new Posicion(distanciaABeacon, 0);
	} else {
		var anguloRelativo = angulo - this.mapa.desfasaje;
		var y = Math.sin(anguloRelativo)*distanciaABeacon;
		var x = Math.cos(anguloRelativo)*distanciaABeacon;
		posicion = new Posicion(x, y);
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
	beaconsVisibles.sort(
		function(a, b){
			//return b.accuracy - a.accuracy
			if(a.accuracy > b.accuracy){
				return -1;
			}
			if(a.accuracy < b.accuracy){
				return 1;
			}
			return 0;
		});

	var puntos;
	for(i = 0; i < 3; i++){
		var valorUnico;
		var posicionBeacon = this.mapa.getPosicionDeBeacon(valorUnico);
		var punto = { x: posicionBeacon.x, y: posicionBeacon.y, z: 0, r: beaconsVisibles[0].accuracy };
		puntos.push(punto);
	}
	
	var p4 = trilaterate(puntos[0], puntos[1], puntos[2]);
	console.log(p4);
	var posicionActual = new Posicion(p4.x, p4.y);
	return posicionActual;
}