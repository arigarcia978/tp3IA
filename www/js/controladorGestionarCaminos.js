var posicionesHardcodeadas = [
	new Posicion(3, 0),
	new Posicion(3, 2),
	new Posicion(-1, 2),
	new Posicion(3, 3),
	new Posicion(6, 0),
	new Posicion(6, 4),
	new Posicion(1, 4),
	new Posicion(1, 5),
	new Posicion(1, 6),
	new Posicion(4, 6),
	new Posicion(4, 5),
	new Posicion(4, 6),
	new Posicion(6, 6),
	new Posicion(999, 999),	new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999), new Posicion(999, 999),
	new Posicion(999, 999)];

// var lugares = [
// 	new Lugar('Puerta', new Posicion(3, 0), ''),
// 	new Lugar('SAE', new Posicion(-1, 2), ''),
// 	new Lugar('Fotocopiadora', new Posicion(3, 3), ''),
// 	new Lugar('Oficina de Alguien', new Posicion(6, 4), ''),
// 	new Lugar('Escalera', new Posicion(1, 4), ''),
// 	new Lugar('Laboratorio', new Posicion(4, 5), ''),
// 	new Lugar('Básicas', new Posicion(6, 6), '')
// ]

var lugares = [
	new Lugar('Puerta',null , 'Grande y hermosa como una mentita'),
	new Lugar('SAE',null , 'Estudiantes que quieren ser políticos y no les sale'),
	new Lugar('Fotocopiadora',null , 'Donde te cobran el precio de un libro por piratearlo'),
	new Lugar('Oficina de Alguien',null , 'De quién será? Hummm.... INTEDEZANTE'),
	new Lugar('Escalera',null , 'Que paja'),
	new Lugar('Laboratorio',null , 'Uno piensa que es algo re de química, pero es solo un aula con más decoración'),
	new Lugar('Básicas',null , 'Sistemas es de Básicas?')
]

function getLugar(nombre) {

	lugares.filter(function(lugar) {
		return lugar.getNombre() == nombre;
	})

}


function ControladorGestionarCaminos() {
	this.ultimoNodo;
	this.posicionHardActual = 0;
	this.nodos = [];
}
ControladorGestionarCaminos.prototype.getPosicionActual = function() {
	return posicionesHardcodeadas[this.posicionHardActual++];
}
ControladorGestionarCaminos.prototype.agregarNodoIntermedio = function(posicion) {
	var nodo = new Nodo(posicion);
	this.ultimoNodo = nodo;
	this.nodos.push(nodo);
};
ControladorGestionarCaminos.prototype.agregarNodoDestino = function(posicion, lugar) {

	lugar.agregarPosicion(posicion);
	var nodo = new Nodo(posicion);
	nodo.setLugarDeInteres(lugar);
	this.nodos.push(nodo);

}

var controladorGestionarCaminos = new ControladorGestionarCaminos();