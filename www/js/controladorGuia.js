var caminos = [
	[]
];

function ControladorGuia (){
	this.mapa = controladorGestionarMapa.getMapa();
	this.camino;
	this.nodoAlQueIr;
	this.numeroDeNodo = -1;
}
ControladorGuia.prototype.irA = function(lugar, posicionActual){
	var nodoOrigen = this.getNodoDeOrigen(posicionActual);
	var nodoDestino = this.getNodoDeDestino(lugar);
	this.camino = this.getCamino(nodoOrigen, nodoDestino);
	//this.getAnguloDeMovimiento(nodoOrigen.posicion, nodoDestino.posicion);
}
ControladorGuia.prototype.getNodoDeOrigen = function(posicion){
	return getNodoMasCercano(posicion);
}
ControladorGuia.prototype.getNodoDeDestino = function(lugar){
	var nodos = this.mapa.nodos;
	for(var i = 0; i < nodos.length; i++){
		var nodo = nodos[i];
		if(nodo.esUnNodoDeDestino()){
			if(nodo.lugar == lugar){
				return nodo;
			}
		}
	}
}
ControladorGuia.prototype.getCamino = function(origen, destino){
	for(var i = 0; i < caminos.length; i++){
		var camino = caminos[i];
		var nodoOrigen = camino[0];
		var nodoDestino = camino[camino.length - 1];
		if(nodoOrigen === origen && nodoDestino === destino){
			return camino;
		}
	}
}
ControladorGuia.prototype.comprobarElCamino = function(posicionActual, compass){
	if(this.nodoAlQueIr == undefined){
		this.nodoAlQueIr = caminos[0];
		this.numeroDeNodo = 0;
		comprobarElCamino(posicionActual, compass);
	} else {
		if(estoyEnElNodo(this.nodoAlQueIr, posicionActual)){
			if(estoyEnElDestino(this.nodoAlQueIr)){
				return -1;
			} else {
				this.numeroDeNodo++;
				this.nodoAlQueIr = caminos[this.numeroDeNodo];
				comprobarElCamino(posicionActual, compass);
			}
		} else {
			return getAnguloDeMovimiento(posicionActual, this.nodoAlQueIr.posicion, compass);
		}
	}
}
ControladorGuia.prototype.estoyEnElDestino = function(nodo){
	return this.nodo === camino[camino.length];
}
ControladorGuia.prototype.estoyEnElNodo = function(nodo, posicionActual){
	return getDistanciaEntrePuntos(posicionActual, nodo.posicion) < 0.5;
}
ControladorGuia.prototype.getAnguloDeMovimiento = function(posicion1, posicion2, compass){
	
	var desfasaje = this.getDesfasajeDeMapa();
	//var desfasaje = 205;
	var anguloRealEnNuestroEje = compass - desfasaje;
	
	var anguloAlQueApuntar = this.getAnguloAlQueIr(posicion1, posicion2);
	var diferencia = anguloAlQueApuntar - anguloRealEnNuestroEje;
	
	var anguloResultante = anguloRealEnNuestroEje + diferencia;
	return anguloResultante;
}
ControladorGuia.prototype.getAnguloAlQueIr = function(posicion1, posicion2){
	if(posicion1.x == posicion2.x){
		if(posicion1.y > posicion2.y){
			return 90;
		} else {
			return 270;
		}
	} else if(posicion1.y == posicion2.y){
		if(posicion1.x > posicion2.x){
			return 0;
		} else {
			return 180;
		}
	}
	var catop = Math.abs(posicion1.y - posicion2.y);
	var catad = Math.abs(posicion1.x - posicion2.x);
	var angulo = math.atan(catop/catad)*(180/3.14);
	
	if (posicion1.x > posicion2.x){
		if(posicion1.y > posicion2.y){
			return 180 + angulo;
		} else {
			return 180 - angulo;
		}
	} else {
		if(posicion1.y > posicion2.y){
			return 360 - angulo;
		} else {
			return angulo;
		}
	}
}
ControladorGuia.prototype.getDesfasajeDeMapa = function(){
	//pedir al otro controlador el mapa??
	return this.mapa.desfasaje;
}

function getNodoMasCercano(posicion){
	var nodos = this.mapa.nodos;
	var menorDistancia = -1;
	var nodoMasCercano = {};
	for(var i = 0; i < nodos.length; i++){
		var nodo = nodos[i];
		var distancia = getDistanciaEntrePuntos(posicion, nodo.posicion);
		if(menorDistancia == -1 || distancia < menorDistancia){
			menorDistancia = distancia;
			nodoMasCercano = nodo;
		}
	}
	return nodoMasCercano;
}
function getDistanciaEntrePuntos(punto1, punto2){
	var catop = Math.abs(punto1.y - punto2.y);
	var catad = Math.abs(punto1.x - punto2.x);
	return Math.sqrt(Math.pow(catop, 2) + Math.pow(catad, 2));
}

var controladorGuia = new ControladorGuia();