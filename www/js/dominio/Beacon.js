function Beacon(uuid, major, minor){
	this.uuid = uuid;
	this.major = major;
	this.minor = minor;
	this.posicion;
}

Beacon.prototype.setPosicion = function(posicion){
	this.posicion = posicion;
}