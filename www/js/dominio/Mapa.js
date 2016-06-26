function Mapa(){
	this.desfasaje;
	this.beacons = [];
}

Mapa.prototype.setDesfasaje = function(angulo){
	this.desfasaje = angulo;
}

Mapa.prototype.addBeacon = function(beacon){
	this.beacons.push(beacon);
}
Mapa.prototype.hayBeaconsCargados = function(){
	return this.beacons.length != 0;
}