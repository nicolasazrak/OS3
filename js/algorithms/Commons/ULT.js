'use strict';

class ULT {

	constructor(data) {

		for(var key in data){
			this[key] = data[key];
		}

		this.bursts.forEach( burst => {
			burst.left = burst.quantum;
		});

		this.hasEnded();

	}

	/* Deberia tener una estrategia para ver cual usar depende cual sea el algoritmo para los ults */
	/* Por ahora solamente voy a pensar el caso que tenga un 1 ULT */
	getNextResource(){
		var leftBursts = this.bursts.filter(b => b.left > 0);
		if(leftBursts.length === 0)	return;
		return leftBursts[0];
	}

	/**
	 * @return {Array}
	 */
	getSubTasks(){
		return [this];
	}

	/* Devuelta, esto es para cuando hay mas de un ULT, todavia no esta hecho */
	getStartTime(){
		return this.start;
	}


	getId(){
		return this.id;
	}

	/** Es cuando el kernel le da el recurso que necesita
	* Se lo descuenta de lo necesario
	* @param {string} resource El dispositivo que se ejecuta
	* @param {number} time por cuanto tiempo puede ejecutar
	* @return {number} el ULT que lo ejecuto
	*/
	giveResource(resource, time){
		var foundBurst = false;
		this.bursts.forEach(burst => {
			if(burst.left > 0 && !foundBurst){
				if(burst.device != resource){
					throw new Error('Se le intento asignar ' + resource + ' cuando en realidad necesitaba ' + burst.device + ' en el momento ' + time);
				}
				foundBurst = true;
				burst.left -= time;
			}
		}, this);

		return this.id;
	}

	/**
	* Devuelve si el proceso ya termino
	* Termino si todas sus rafagas ya se ejecutaron
	* @return {boolean}
	*/
	hasEnded(){
		return this.bursts.every(b => b.left === 0);
	}

}

module.exports = ULT;
