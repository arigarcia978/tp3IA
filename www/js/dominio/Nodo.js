function Nodo(posicion){
	this.posicion = posicion;
	this.nodosAlcanzables = [];
	this.lugar;
}
Nodo.prototype.addNodoAlcanzable = function(nodo){
	this.nodosAlcanzables.push(nodo);
}
Nodo.prototype.setLugarDeInteres = function(lugar){
	this.lugar = lugar;
}
Nodo.prototype.esUnNodoDeDestino = function() {
	return (this.lugar != undefined);
};
