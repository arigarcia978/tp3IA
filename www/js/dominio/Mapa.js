function Mapa(){
	this.desfasaje;
	//this.beacons = [];
	this.beacons = [];
	this.beacons.push(new Beacon("b9407f30-f5f8-466e-aff9-25556b57fe6d", "53423", "34137"));
	this.beacons.push(new Beacon("b9407f30-f5f8-466e-aff9-25556b57fe6d", "22210", "7642"));

	console.log(this.beacons);
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
Mapa.prototype.getPosicionDeBeacon = function(valorUnico){
	var beacons = this.beacons;
	for(var i = 0; i < beacons.length; i++){
		var b = beacons[i];
		if(b.valorUnico == valorUnico){
			return b.posicion;
		}
	}
}