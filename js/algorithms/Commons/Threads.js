'use strict';

var Fifo 		= require('../Fifo');
var KLTOutput 	= require('./KLTOutputStrategy');

class KLT {

	constructor(data) {

		for(var key in data){
			this[key] = data[key];
		}

		if(data.ULTs) this.ULTs = this.ULTs.map(ult => new ULT(ult));

	}

	/**
	 * Planifica los ults primero, de esa forma sabe en que orden ir devolviendo
	 * los recursos que necesita
	 */
	beforeSchedule(){

		//La forma mas fea de clonar objetos que existe
		//Se usa porque los ULTs no son inmutables, entonces cuando planifico
		//Se modifican y el burst left disminuye, cuando se planifica el klt
		//ya va a estar finalizado
		var scheduler = (this.algorithm !== undefined) ? new this.algorithm() : new Fifo();

		//La idea de planificar aca los ULTs es saber en que orden se ejecutan
		//Para poder darlos en orden en el metodo getNextResource
		this.bursts = scheduler.schedule(this.ULTs, {
			ultMode: true,
			quantum: {
				cpu: 3
			},
			output: KLTOutput
		})
		.map( burst => {
			burst.left = burst.quantum;
			return burst;
		})
		.sort( (burst1, burst2) => {
			return burst1.start > burst2.start;
		});

		//Reiniciamos para que no quede nada de la planificacion anterior
		this.ULTs.forEach(ult => ult.beforeSchedule());

	}


	/**
	 * Devuelve los ults, esta pensado para que el output pueda ser polimorfico con los ULTs
	 * Para que sea más claro fijarse que en ULT existe el mismo metodo y devuelve a si mismo
	 * @return {Array}
	 */
	getSubTasks(){
		return this.ULTs;
	}

	getStartTime(){
		return this.bursts[0].start;
	}

	getId(){
		return this.id;
	}



	/* Deberia tener una estrategia para ver cual usar depende cual sea el algoritmo para los ults */
	/* Por ahora solamente voy a pensar el caso que tenga un 1 ULT */
	getNextResource(){
		var leftBursts = this.bursts.filter(b => b.left > 0);
		if(leftBursts.length === 0)	return;
		return leftBursts[0];
	}

	/** Es cuando el kernel le da el recurso que necesita
	* Se lo descuenta de lo necesario
	* @param {string} resource El dispositivo que se ejecuta
	* @param {number} time por cuanto tiempo puede ejecutar
	* @return {number} el ULT que lo ejecuto
	*/
	giveResource(resource, time){

		var foundBurst = false;
		var ultId;
		this.bursts.forEach(burst => {
			if(burst.left > 0 && !foundBurst){
				if(burst.device != resource){
					throw new Error('Se le intento asignar ' + resource + ' cuando en realidad necesitaba ' + burst.device + ' en el momento ' + time);
				}
				foundBurst = true;
				burst.left -= time;
				ultId = burst.id;
			}
		}, this);

		return ultId;

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



class ULT extends KLT {

	beforeSchedule(){
		this.bursts.forEach( burst => {
			burst.left = burst.quantum;
			burst.id = this.id;
		}.bind(this));
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

}

module.exports = {
	KLT: KLT,
	ULT: ULT
};
