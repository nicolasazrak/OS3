'use strict';
var Output = require('./Commons/Output');
var Fifo = require('./Fifo');

module.exports = class RoundRobbin extends Fifo {

	getQuantumFor(resource, KLT){
		/* Parece super confuso, pero lo que hace es para poder especificar cuanto es lo maximo que se ejecuta por dispositivo */
		/* Ej aca en round robbin le pasamos que para la cpu puede ejecutar un maximo */
		/* Entonces si esta asignado en options.quantum.cpu se usa ese valor o el restante */
		return this.options.quantum[resource.device] !== undefined ? Math.min(resource.left, this.options.quantum[resource.device]) : resource.left;
	}

};
