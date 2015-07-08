'use strict';

var Common = require('./Common');

var newQueue = [], readyQueue = [], waitQueue = [], exitQueue = [], results = {}, time = 0;

/*

RETURNS:

	[
		{
			klt_id: 1,
			ult_id: 2,
			description: 'Programa 1',
			result: [null, 'ul1', 'ult1', 'ult1', 'io', 'io', null, 'ult1', null, null]
		},
		{
			klt_id: 2,
			ult_id: 2,
			description: 'Programa 2',
			result: ['ult1', 'io',  'io',  'io', null, 'ult1', 'io', null, 'io', 'ult1']
		}
	]

*/

module.exports = {

	schedule: function(newQueue){

		//Init
		var __results = [];
		newQueue.forEach(function(){ __results.push([]); });

		do {
			//Init
			__results.forEach(function(r){ r.push(null); });

			//Reloj
			readyQueue.forEach(function(task){
				var currentThread = task.ULTs[0];

				if(currentThread.bursts[0].quantum === 0) {
					currentThread.bursts.splice(0, 1);
					waitQueue.push(readyQueue.splice(0, 1)[0]);

					//En este caso no se mueve al thread a ningun lado porque es el que ocaciono el IO
				}
			});

			//E/S
			waitQueue.forEach(function(task){
				var currentThread = task.ULTs[0];

				if(currentThread.bursts[0].quantum === 0) {
					currentThread.bursts.splice(0, 1);
					readyQueue.push(waitQueue.splice(0, 1)[0]);

					//Mover thread al final de la threadQueue
					task.ULTs.shift();
					task.ULTs.push(currentThread);
				}
			});

			//Proceso nuevo
			newQueue.forEach(function(task){
				/* Futura implementacion de start ULT
				//Obtener el thread de menor start_time
				var firstThread = task.ULTs.reduce(function(prev, current){
					return (prev.start >= current.start) ? prev : current;
				});

				//Mover firstThread al primer lugar de la cola de hilos
				task.ULTs.splice(newQueue.indexOf(firstThread), 1);
				task.ULTs.unshift(firstThread);

				//Verificar si el proceso esta listo para entrar a la readyQueue
				if(firstThread.start == time) {
					console.log('Entro el programa ' + task.id);
					readyQueue.push(task);
					newQueue.splice(newQueue.indexOf(task), 1);
				}
				*/
				if(task.start == time) {
					console.log('Entro el programa ' + task.id);
					readyQueue.push(task);
					newQueue.splice(newQueue.indexOf(task), 1);
				}
			});


			//Procesando CPU
			var currentTask = readyQueue[0];

			if(currentTask !== undefined){
				var currentThread = currentTask.ULTs[0];

				if(currentThread.bursts[0] !== undefined){
					console.log('CPU: Ejecutando el programa ' + currentTask.id);

					__results[currentTask.id][time] = 'cpu';
					currentThread.bursts[0].quantum--;

				} else {
					console.log('Programa ' + currentTask.id + ': Termino');
					exitQueue.push(readyQueue.splice(0, 1)[0]);
				}
			} else {
				console.log('CPU: sin actividad');
			}

			//Procesando IO
			var currentTask = waitQueue[0];

			if(currentTask !== undefined){
				var currentThread = currentTask.ULTs[0];

				if(currentThread.bursts[0] !== undefined){
					console.log('IO: Ejecutando el programa ' + currentTask.id);

					__results[currentTask.id][time] = 'io';
					currentThread.bursts[0].quantum--;
				} else {
					console.log('Programa ' + currentTask.id + ': Termino');
					exitQueue.push(waitQueue.splice(0, 1)[0]);
				}
			} else {
				console.log('IO: sin actividad');
			}

			time++;

		} while(newQueue.length !== 0 || readyQueue.length !== 0 || waitQueue.length !== 0);


		//__results.count = time;
		console.log('Tiempo: ' + time);
		console.log(__results);

		results.tasks = [
			{ id: 1, description: 'Programa 1', result: __results[0] },
			{ id: 2, description: 'Programa 2', result: __results[1] }
		];

		results.count = time;

		return results;
	}

};
