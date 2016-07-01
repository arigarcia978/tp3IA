function Lugar(nombre, posicion, descripcion){
	this.nombre = nombre;
	this.posicion = posicion;
	this.descripcion = descripcion;
}
Lugar.prototype.getNombre = function() {
	return this.nombre;
};
Lugar.prototype.agregarPosicion = function(posicion) {
	this.posicion = posicion;
};