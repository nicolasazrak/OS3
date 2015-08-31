'use strict';
var Output = require('./Commons/Output');
var FIFO = require('./Fifo');

module.exports = class SJF extends FIFO {

	static getDescription(){
		return "SJF";
	}

	/**
	 * Devuelve cual es el proximo KLT para ejecutar el dispositivo
	 * En FIFO o ROUND ROBBIN, siempre es el primero que este en la cola
	 * En SJF, es el que necesita menos quantum
	 * @param  {string} device Dispositivo a buscar
	 * @return {KLT}        KLT que ejecutara
	 */
	chooseKLTFor(device){

		var sorted = this.devicesQueue[device].filter(klt => klt.getNextResource() !== undefined).sort((klt1, klt2) => klt1.getNextResource().left > klt2.getNextResource().left);

		if(sorted.length > 0){
			for(var i in this.devicesQueue[device]){
				if(this.devicesQueue[device][i] === sorted[0]){
					this.devicesQueue[device].splice(i ,1);
				}
			}
			return sorted[0];
		}

	}


};
