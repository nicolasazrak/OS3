'use strict';

var ULT 		= require('./ULT');
var Fifo 		= require('../Fifo');
var KLTOutput 	= require('./KLTOutputStrategy');

class KLT {

	constructor(data) {

		for(var key in data){
			this[key] = data[key];
		}

		this.ULTs = this.ULTs.map(ult => new ULT(ult));

	}

	beforeSchedule(){


		//La forma mas fea de clonar objetos que existe
		//Se usa porque los ULTs no son inmutables, entonces cuando planifico
		//Se modifican y el burst left disminuye, cuando se planifica el klt
		//ya va a estar finalizado
		var scheduler = (this.algorithm !== undefined) ? new this.algorithm() : new Fifo();

		//La idea de planificar aca los ULTs es saber en que orden se ejecutan
		//Para poder darlos en orden en el metodo getNextResource
		this.scheduled = scheduler.schedule(this.ULTs, {
			ultMode: true,
			quantum: {
				cpu: 3
			},
			output: KLTOutput
		})
		/*.map(burst => {
			for(var ult of this.ULTs){
				if(ult.getId() === burst.id){
					burst.ult = ult;
					burst.left = burst.quantum;
					return burst;
				}
			}
		}.bind(this))*/
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

	/* Deberia tener una estrategia para ver cual usar depende cual sea el algoritmo para los ults */
	/* Por ahora solamente voy a pensar el caso que tenga un 1 ULT */
	getNextResource(){
		return this.ULTs[0].getNextResource();
	}

	/**
	 * Devuelve los ults, esta pensado para que el output pueda ser polimorfico con los ULTs
	 * Para que sea más claro fijarse que en ULT existe el mismo metodo y devuelve a si mismo
	 * @return {Array}
	 */
	getSubTasks(){
		return this.ULTs;
	}

	/* Devuelta, esto es para cuando hay mas de un ULT, todavia no esta hecho */
	getStartTime(){
		return this.ULTs[0].getStartTime();
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
		this.ULTs[0].giveResource(resource, time);
		return this.ULTs[0].id;
	}

	/**
	* Devuelve si el proceso ya termino
	* Termino si todas sus rafagas ya se ejecutaron
	*/
	hasEnded(){
		return this.ULTs.every( ult => ult.hasEnded() );
	}

}

module.exports = KLT;
