'use strict';

module.exports = function(data){

	this.data = data;

	/* Le asigna a todas las rafagas que le faltan el total */
	data.ULTs.forEach( ult => {
		ult.bursts.forEach( burst => {
			burst.left = burst.quantum;
		});
	});

	this.waitingResource = null;

	/* Deberia tener una estrategia para ver cual usar depende cual sea el algoritmo para los ults */
	/* Por ahora solamente voy a pensar el caso que tenga un 1 ULT */
	this.getNextResource = function(){
		this.waitingResource = this.data.ULTs[0].bursts[0];
		return this.waitingResource;
	};

	this.isWaitingForResource = function(){
		return this.waitingResource !== null;
	};

	this.getWaitingResource = function(){
		return this.waitingResource;
	};

	/* Devuelta, esto es para cuando hay mas de un ULT, todavia no esta hecho */
	this.getStartTime = function(){
		return this.data.ULTs[0].start;
	};


	this.getId = function(){
		return this.data.id;
	};

	/** Es cuando el kernel le da el recurso que necesita
	* Se lo descuenta de lo necesario
	* @param resource string El dispositivo que se ejecuta
	* @param time int por cuanto tiempo puede ejecutar
	* @return el ULT que lo ejecuto
	*/
	this.giveResource = function(resource, time){

		/* Es solo para checkear pero no deberia dar un recurso que no necesita */
		if(this.waitingResource === resource){

			/* Saca la cantidad de quantum que le hace falta */
			this.waitingResource.left -= time;

			if(this.waitingResource.left <= 0){
				/* Si el cuantum queda en 0 ya termino y lo saca de lo que necesita */
				this.data.ULTs[0].bursts.shift();
			}

			/* Tiene que esperar a que le vuelvan a preguntar que recurso necesita */
			this.waitingResource = null;

		}

		return this.data.ULTs[0].id;

	};

	/**
	* Devuelve si el proceso ya termino
	* Termino si todas sus rafagas ya se ejecutaron
	*/
	this.hasEnded = function(){
		return this.data.ULTs[0].bursts.length === 0;
	};

};
