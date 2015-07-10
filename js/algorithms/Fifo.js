'use strict';

var Output = require('./Commons/Output');

function schedule(queue){

	/* TODO: porque tengo que agregarlo aca ??? */
	/* Cual es el scope de KLT si lo agrego afuera ??? */
	var KLTModel = require('./Commons/KLT');

	var output = Output.createInitialQueue(queue), //La salida estandar
		currentTime = 0,   //El reloj que dice en que momento esta
		currentUsage = {}, //Dice para cada dispositivo si se esta usando, quien y hasta cuando.
		devicesQeueue = {} //Es la cola para cada dispositivo, tiene los que estan esperando por eso
		;


	var ults = queue.some( task => {
		return task.ULTs.length > 1;
	});

	if(ults){
		alert('El algoritmo todavía no soporta hilos de usuario.');
		return output;
	}

	/* TODO clonar de una forma mas linda */
	/* El JSON.stringify ... es una forma muuy fea de clonar un objeto */
	queue = queue.map( k => new KLTModel(JSON.parse(JSON.stringify(k))) );

	do {

		/* Busca los nuevos procesos que haya aparecido despues del currentTime */
		/* que todavía no esten en ninguna cola */
		/* y que todavia no hayan terminado */
		var currentTimeQueue = queue.filter(KLT => KLT.getStartTime() <= currentTime);
		var notInWaitQueue 	 = currentTimeQueue.filter(KLT => !KLT.isWaitingForResource());
		var notEnded 		 = notInWaitQueue.filter(KLT => !KLT.hasEnded());

		notInWaitQueue.forEach(KLT => {

				var resource = KLT.getNextResource();
				if(resource === undefined){
					console.error('Un KLT no devolvio ningun recurso');
					return;
				}

				/* Crea la cola para el dispositivo */
				if(!devicesQeueue.hasOwnProperty(resource.device)){
					devicesQeueue[resource.device] = [];
				}

				/* Agrega el KLT a la cola del recurso que necesita */
				devicesQeueue[resource.device].push(KLT);

		});

		/* Revisa cada dispositivo a ver si alguno se libero */
		for(var device in devicesQeueue){

			/* Se le termino el tiempo del quantum (o no habia nada ejecutando ) */
			if(currentUsage[device] === undefined || currentUsage[device].ends === currentTime){

				delete currentUsage[device];

				/* Revisa si para el dispositivo que se acaba de liberar */
				/* Hay alguien en la cola esperando */
				if(devicesQeueue.hasOwnProperty(device) && devicesQeueue[device].length > 0){

					/* Saca el proximo dispositivo de la cola */
					var KLT = devicesQeueue[device].shift();

					var assignedResource = KLT.getWaitingResource();

					/* Entonces se le da el recurso a ese KLT */
					var ult_id = KLT.giveResource(assignedResource, assignedResource.quantum);

					/* Le asina el recurso por el tiempo que lo necesite (en FIFO todo el quantum) */
					currentUsage[assignedResource.device] = { klt: KLT, ends: currentTime + assignedResource.quantum };

					/* Agrega a la salida que ese KLT se ejecuto en ese momento */
					Output.addUsageToOutput({
						output: output,
						klt_id: KLT.getId(),
						ult_id: ult_id,
						from: currentTime,
						quantum: assignedResource.quantum,
						device: device
					});

				}

			}

		}

		/* Aumenta el reloj */
		currentTime++;

		if(currentTime > 50){
			/* Es para evitar los loops infinitos no deberia estar */
			return Output.completeEmptys(output);
		}

	} while (queue.some(KLT => !KLT.hasEnded()));

	return Output.completeEmptys(output);

}

module.exports = {
	schedule: schedule
};
