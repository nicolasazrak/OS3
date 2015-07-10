'use strict';

module.exports = class KLT {

	constructor(data) {

		this.data = data;

		/* Le asigna a todas las rafagas que le faltan el total */
		data.ULTs.forEach( ult => {
			ult.bursts.forEach( burst => {
				burst.left = burst.quantum;
			});
		});

	}

	/* Deberia tener una estrategia para ver cual usar depende cual sea el algoritmo para los ults */
	/* Por ahora solamente voy a pensar el caso que tenga un 1 ULT */
	getNextResource(){
		var leftBursts = this.data.ULTs[0].bursts.filter(b => b.left > 0);
		if(leftBursts.length === 0){
			return;
		}
		return leftBursts[0];
	}

	/* Devuelta, esto es para cuando hay mas de un ULT, todavia no esta hecho */
	getStartTime(){
		return this.data.ULTs[0].start;
	}


	getId(){
		return this.data.id;
	}

	/** Es cuando el kernel le da el recurso que necesita
	* Se lo descuenta de lo necesario
	* @param resource string El dispositivo que se ejecuta
	* @param time int por cuanto tiempo puede ejecutar
	* @return el ULT que lo ejecuto
	*/
	giveResource(resource, time){

		var foundBurst = false;
		this.data.ULTs[0].bursts.forEach(burst => {
			if(burst.left > 0 && !foundBurst){
				if(burst.device != resource){
					throw 'Se le dio un recurso innecesario';
				}
				foundBurst = true;
				burst.left -= time;
			}
		}, this);

		return this.data.ULTs[0].id;

	}

	/**
	* Devuelve si el proceso ya termino
	* Termino si todas sus rafagas ya se ejecutaron
	*/
	hasEnded(){
		return this.data.ULTs[0].bursts.every(b => b.left === 0);
	}

};
