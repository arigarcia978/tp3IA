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
Mapa.prototype.beaconCargado = function(beacon){
	var beacons = this.beacons;
	for(var i = 0; i < beacons.length; i++){
		var b = beacons[i];
		console.log(b);
		if(b.valorUnico == beacon.valorUnico){
			return true;
		}
	}
	return false;
}