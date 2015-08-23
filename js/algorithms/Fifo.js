'use strict';

var Output = require('./Commons/Output');
var KLTModel = require('./Commons/KLT');

class FIFO {


	checkUltsSize(queue){
		var ults = queue.some( task => {
			return task.ULTs.length > 1;
		});

		if(ults){
			throw 'El algoritmo todavía no soporta ULTs';
		}
	}

	/**
	 * Devuelve cual es el proximo KLT para ejecutar el dispositivo
	 * En FIFO o ROUND ROBBIN, siempre es el primero que este en la cola
	 * En SJF, es el que necesita menos quantum
	 * @param  {string} device Dispositivo a buscar
	 * @return {KLT}        KLT que ejecutara
	 */
	chooseKLTFor(device){
		/* Cuando SJF Herede cambia esto y es todo lo que hay que hacer */
		/* En fifo simplemente sacamos al primero de la lista */
		return this.devicesQueue[device].shift();
	}

	/**
	 * Devuelve la cantidad de quantum que se le va a asignar al KLT
	 * En FIFO, se le asigna todo el quantum necesario
	 * En ROUND ROBBIN, se le asigna el quantum predefinido por el SO
	 * Podria usarse diferente quantum para cada dispositivo
	 * @param  {string} resource
	 * @param  {KLT} KLT
	 * @return {integer}
	 */
	getQuantumFor(resource, KLT){
		/* Para Round Robbin con reemplazar esto ya deberia andar */
		return resource.quantum;
	}

	/**
	 * Verifica si el dispositivo puede ser asignado a alguien, si se puede, se lo asigna
	 * @param  {string} device Dispositivo, ej: CPU/IO
	 */
	assignIfPossible(device){

		console.log('---> Asignando: ', device);

		if(this.currentUsage[device] !== undefined){
			console.log('\t El dispositivo ' + device + ' se encuentra ocupado por: ', this.currentUsage[device].klt.getId());
			return;
		}

		/* Revisa si para el dispositivo que se acaba de liberar */
		/* Hay alguien en la cola esperando */
		if(this.devicesQueue.hasOwnProperty(device) && this.devicesQueue[device].length > 0){

			/* Saca el proximo dispositivo de la cola y le asigna el recurso */
			var KLT = this.chooseKLTFor(device);
			this.assignResourceTo(KLT, device);

		}else{
			console.log('\t No hay nadie esperando por el dispositivo');
		}

	}

	/**
	 * Le asigna el recurso
	 * @param  {KLT} KLT    Klt al que se le va a aginar el recurso
	 * @param  {string} device Dispositivo que se va a usar
	 */
	assignResourceTo(KLT, device){

		var assignedResource = KLT.getNextResource();

		/* Entonces se le da el recurso a ese KLT */
		var givenQuantum = this.getQuantumFor(assignedResource, KLT);
		var ult_id = KLT.giveResource(device, givenQuantum);

		console.log('\t Asignado por ' + givenQuantum + ' quantums a: ', KLT.getId());
		/* Le asina el recurso por el tiempo que lo necesite (en FIFO todo el quantum) */
		this.currentUsage[assignedResource.device] = { klt: KLT, ends: this.currentTime + givenQuantum };

		/* Agrega a la salida que ese KLT se ejecuto en ese momento */
		Output.addUsageToOutput({
			output: this.output,
			klt_id: KLT.getId(),
			ult_id: ult_id,
			from: this.currentTime,
			quantum: givenQuantum,
			device: device
		});

	}

	/**
	 * Verifica si el dispositivo se libero, en caso uqe se libere, saca el KLT y chequeea su proxio requerimiento
	 * @param  {string} device Dispositivo a chequear, ej: CPU/IO
	 */
	checkDeviceQueue(device){

		/* Se le termino el tiempo del quantum (o no habia nada ejecutando ) */
		if(this.currentUsage[device] === undefined || this.currentUsage[device].ends === this.currentTime){

			console.log('Se libero: ' + device + ', estaba siendo usado por: ', this.currentUsage[device]);
			var previousUsage = this.currentUsage[device];

			if(previousUsage !== undefined){

				//TODO refactorizar esto, no me gusta el efecto, es confuso por el nombre

				/* Hay que agregar a la nueva cola lo proximo que use el KLT */
				this.checkKLTNextRequirement(previousUsage.klt);
			}

			delete this.currentUsage[device];

		}

	}

	/**
	 * Verifica cual es la proxima rafaga que va a usar el KLT y lo agrega a la cola de ese dispotivo
	 * @param  {KLT} KLT
	 */
	checkKLTNextRequirement(KLT){

		var resource = KLT.getNextResource();
		if(resource === undefined){
			return;
		}

		console.log('El KLT id ' + KLT.getId() + ' necesita: ', resource);

		/* Crea la cola para el dispositivo */
		if(!this.devicesQueue.hasOwnProperty(resource.device)){
			this.devicesQueue[resource.device] = [];
		}

		/* Agrega el KLT a la cola del recurso que necesita */
		this.devicesQueue[resource.device].push(KLT);

		console.log('La cola de ' + resource.device + ' ahora es: ', this.devicesQueue);

	}

	/**
	 * Planifica las tareas dadas
	 * @param  {Array} queue tareas a planificar
	 * @param  {object} options
	 * @return {Array}       tareas planificadas
	 */
	schedule(queue, options){

		this.options = options;
		this.output = Output.createInitialQueue(queue); //La salida estandar
		this.currentTime = 0;  //El reloj que dice en que momento esta
		this.currentUsage = {}; //Dice para cada dispositivo si se esta usando, quien y hasta cuando.
		this.devicesQueue = {}; //Es la cola para cada dispositivo, tiene los que estan esperando por eso

		this.checkUltsSize(queue);

		/* TODO clonar de una forma mas linda */
		/* El JSON.stringify ... es una forma muuy fea de clonar un objeto */
		queue = queue.map( k => new KLTModel(JSON.parse(JSON.stringify(k))) );

		do {

			console.log('-----------------------------------------------------------------');
			console.log('Inicia el instante ' + this.currentTime);

			/* Revisa cada dispositivo a ver si alguno se libero para agregarlo a la cola */
			for(var device in this.devicesQueue){
				this.checkDeviceQueue(device);
			}

			var newQueue = queue.filter(KLT => this.currentTime == KLT.getStartTime());
			console.log('Llegaron los procesos: ', newQueue.map(k => k.getId()));

			/* Procesamos los nuevos threads */
			/* Y verificamos que es lo que necesita */
			newQueue.forEach(this.checkKLTNextRequirement, this);

			/* Revisa cada dispositivo a ver si alguno se libero para agregarlo a la cola */
			for(var device2 in this.devicesQueue){
				this.assignIfPossible(device2);
			}



			/* Aumenta el reloj */
			this.currentTime++;

			if(this.currentTime > 50){
				/* Es para evitar los loops infinitos no deberia estar */
				console.error('Se corto por el loop infinito');
				return Output.completeEmptys(this.output);
			}

		} while (queue.some(KLT => !KLT.hasEnded()));

		return Output.completeEmptys(this.output);

	}

}

module.exports = FIFO;
