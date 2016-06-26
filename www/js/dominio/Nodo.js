function Nodo(posicion){
	this.posicion = posicion;
	this.nodosAlcanzables = [];
	this.lugar;
}
Nodo.prototype.addNodoAlcanzable = function(nodo){
	this.nodosAlcanzables.push();
}
Nodo.prototype.setLugarDeInteres = function(lugar){
	this.lugar = lugar;
}
