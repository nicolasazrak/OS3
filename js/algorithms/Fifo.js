'use strict';

var UIOutput = require('./Commons/UIOutputStrategy');


class FIFO {

	static getDescription(){
		return "Fifo";
	}

	/**
	 * Devuelve cual es el proximo thread para ejecutar el dispositivo
	 * En FIFO o ROUND ROBBIN, siempre es el primero que este en la cola
	 * En SJF, es el que necesita menos quantum
	 * @param  {string} device Dispositivo a buscar
	 * @return {KLT|ULT}
	 */
	chooseNextFor(device){
		/* Cuando SJF Herede cambia esto y es todo lo que hay que hacer */
		/* En fifo simplemente sacamos al primero de la lista */
		return this.devicesQueue[device].shift();
	}

	/**
	 * Devuelve la cantidad de quantum que se le va a asignar al thread
	 * En FIFO, se le asigna todo el quantum necesario
	 * En ROUND ROBBIN, se le asigna el quantum predefinido por el SO
	 * Podria usarse diferente quantum para cada dispositivo
	 * @param  {string} resource
	 * @return {number}
	 */
	getQuantumFor(resource){
		/* Para Round Robbin con reemplazar esto ya deberia andar */
		return resource.quantum;
	}

	/**
	 * Devuelve si en ese instante hay algo mas siendo ejecutado para cualquier dispositivo
	 * @return {boolean}
	 */
	isAnythingBeingExecuted(){
		for(var device in this.currentUsage){
			if(this.currentUsage[device] !== undefined){
				return true;
			}
		}
		return false;
	}

	/**
	 * Verifica si el dispositivo puede ser asignado a alguien, si se puede, se lo asigna
	 * @param  {string} device Dispositivo, ej: CPU/IO
	 */
	assignIfPossible(device){

		this.logger.log('---> Asignando: ', device);

		if(this.currentUsage[device] !== undefined){
			this.logger.log('\t El dispositivo ' + device + ' se encuentra ocupado por: ', this.currentUsage[device].thread.getId());
			return;
		}

		/* Revisa si para el dispositivo que se acaba de liberar */
		/* Hay alguien en la cola esperando */
		if(this.devicesQueue.hasOwnProperty(device) && this.devicesQueue[device].length > 0){

			//En caso que este en ultMode chequea si hay algo mas siendo ejecutado al mismo tiempo
			//Cosa que no puede pasar si planificamos ults, no puede haber IO al mismo tiempo que cpu
			if(!this.ultMode || !this.isAnythingBeingExecuted()){

				/* Saca el proximo dispositivo de la cola y le asigna el recurso */
				var thread = this.chooseNextFor(device);
				this.assignResourceTo(thread, device);

			}else{
				this.logger.log('\t El dispotivo esta libre pero ya hay alguien mas ejecutando, esperando...');
			}


		}else{
			this.logger.log('\t No hay nadie esperando por el dispositivo');
		}

	}

	/**
	 * Le asigna el recurso
	 * @param  {KLT|ULT} thread al que se le va a aginar el recurso
	 * @param  {string} device Dispositivo que se va a usar
	 */
	assignResourceTo(thread, device){

		var assignedResource = thread.getNextResource();

		/* Entonces se le da el recurso a ese thread */
		var givenQuantum = this.getQuantumFor(assignedResource, thread);
		var id = thread.giveResource(device, givenQuantum);

		this.logger.log('\t Asignado por ' + givenQuantum + ' quantums a: ', thread);

		/* Le asina el recurso por el tiempo que lo necesite (en FIFO todo el quantum) */
		this.currentUsage[assignedResource.device] = { thread: thread, ends: this.currentTime + givenQuantum };

		/* Agrega a la salida que ese thread se ejecuto en ese momento */
		this.outputStrategy.addUsageToOutput(this.output, id, this.currentTime, givenQuantum, device);

	}

	/**
	 * Verifica si el dispositivo se libero, en caso uqe se libere, saca el thread y chequeea su proxio requerimiento
	 * @param  {string} device Dispositivo a chequear, ej: CPU/IO
	 */
	checkDeviceQueue(device){

		/* Se le termino el tiempo del quantum (o no habia nada ejecutando ) */
		if(this.currentUsage[device] === undefined || this.currentUsage[device].ends === this.currentTime){

			this.logger.log('Se libero: ' + device + ', estaba siendo usado por: ', this.currentUsage[device]);
			var previousUsage = this.currentUsage[device];

			if(previousUsage !== undefined){

				//TODO refactorizar esto, no me gusta el efecto, es confuso por el nombre

				/* Hay que agregar a la nueva cola lo proximo que use el thread */
				this.checkNextRequirement(previousUsage.thread);
			}

			delete this.currentUsage[device];

		}

	}

	/**
	 * Verifica cual es la proxima rafaga que va a usar el thread y lo agrega a la cola de ese dispotivo
	 * @param  {KLT|ULT}
	 */
	checkNextRequirement(thread){

		var resource = thread.getNextResource();
		if(resource === undefined) return;

		this.logger.log('El thread id ' + thread.getId() + ' necesita: ', resource);

		/* Crea la cola para el dispositivo */
		if(!this.devicesQueue.hasOwnProperty(resource.device)){
			this.devicesQueue[resource.device] = [];
		}

		/* Agrega el thread a la cola del recurso que necesita */
		this.devicesQueue[resource.device].push(thread);

		this.logger.log('La cola de ' + resource.device + ' ahora es: ', this.devicesQueue);

	}

	/**
	 * Planifica las tareas dadas
	 * @param  {Array} queue tareas a planificar
	 * @param  {object} options
	 * @return {Array} tareas planificadas en el formato especificado por options.output
	 */
	schedule(queue, options){

		this.options 		= options || {};

		//Significa si se puede ejecutar cpu al mismo tiempo que io,
		//Si es true, cada vez que se intente asignar un recurso hay que chequear que nadie mas este ejecutando nada
		this.ultMode 		= this.options.ultMode || false;
		this.outputStrategy = this.options.output || UIOutput; //La salida estandar
		this.output 		= this.outputStrategy.createInitialQueue(queue);
		this.logger			= (this.options.verbose !== undefined && this.options.verbose === true) ? console : {log: () => {}};

		this.currentTime 	= 0;  //El reloj que dice en que momento esta
		this.currentUsage 	= {}; //Dice para cada dispositivo si se esta usando, quien y hasta cuando.
		this.devicesQueue	= {}; //Es la cola para cada dispositivo, tiene los que estan esperando por eso

		queue.forEach(thread => thread.beforeSchedule());

		do {

			this.logger.log('----------------------------------------------------------------------------');
			this.logger.log('Inicia el instante ' + this.currentTime);

			/* Revisa cada dispositivo a ver si alguno se libero para agregarlo a la cola */
			for(var device in this.devicesQueue){
				this.checkDeviceQueue(device);
			}

			var newQueue = queue.filter(thread => this.currentTime == thread.getStartTime());
			this.logger.log('Llegaron los procesos: ', newQueue.map(k => k.getId()));

			/* Procesamos los nuevos threads */
			/* Y verificamos que es lo que necesita */
			newQueue.forEach(this.checkNextRequirement, this);

			/* Revisa cada dispositivo a ver si alguno se libero para agregarlo a la cola */
			for(var device2 in this.devicesQueue){
				this.assignIfPossible(device2);
			}

			/* Aumenta el reloj */
			this.currentTime++;

			if(this.currentTime > 200){
				/* Es para evitar los loops infinitos, no deberia estar */
				console.error('Se corto por el loop infinito');
				return this.outputStrategy.completeEmptys(this.output);
			}

		} while (queue.some(thread => !thread.hasEnded()));

		return this.outputStrategy.completeEmptys(this.output);

	}

}

module.exports = FIFO;
