'use strict';
var FIFO = require('./Fifo');

module.exports = class SJF extends FIFO {

	static getDescription(){
		return "SJF";
	}

	/**
	 * Devuelve cual es el proximo thread para ejecutar el dispositivo
	 * En FIFO o ROUND ROBBIN, siempre es el primero que este en la cola
	 * En SJF, es el que necesita menos quantum
	 * @param  {string} device Dispositivo a buscar
	 * @return {KLT|ULT} Thread que ejecutara
	 */
	chooseNextFor(device){

		var sorted = this.devicesQueue[device]
			.filter(thread => thread.getNextResource() !== undefined)
			.sort((thread1, thread2) => thread1.getNextResource().left - thread2.getNextResource().left);

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
