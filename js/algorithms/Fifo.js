var Common = require('./Common');

/*
Transforms: 

	[
		{ id: 0, description: 'Programa 1', start: 0, threads: [{ id: 0, start: 0, bursts: [ { device: 'cpu', quantum: 3 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] }] },
		{ id: 1, description: 'Programa 2', start: 2, threads: [{ id: 1, start: 2, bursts: [ { device: 'cpu', quantum: 1 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] }] }
	]

INTERMEDIATE: 

	[ [null, 'ult1'], ['ult1', 'io'], ['ult1', 'io'], ['io', null] ];


RETURNS:

	[
		{ id: 1, description: 'Programa 1', result: [null, 'ul1', 'ult1', 'ult1', 'io', 'io', null, 'ult1', null, null ] },
		{ id: 2, description: 'Programa 2', result: ['ult1', 'io',  'io',  'io', null, 'ult1', 'io', null, 'io', 'ult1'] }
	]
*/

'use strict';

var newQueue = [], readyQueue = [], waitQueue = [], exitQueue = [], result = [], time = 0;

//inputMock 2.0
newQueue = [
	{ id: 0, description: 'Programa 1', start: 0, threads: [{ id: 0, start: 0, bursts: [ { device: 'cpu', quantum: 3 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] }] },
	{ id: 1, description: 'Programa 2', start: 2, threads: [{ id: 1, start: 2, bursts: [ { device: 'cpu', quantum: 1 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] }] }
];

 module.exports = {
	addTask: function(tasks){
		do {
			Common.addTasksToQueue(queue, tasks, time);



			time++;
		} while (readyQueue.length != 0);
	},
	mock: function(){
		//Init
		var __results = [];
		newQueue.forEach(function(){ __results.push([]); });

		do {
			//Init
			__results.forEach(function(r){ r.push(null); });

			//Reloj
			readyQueue.forEach(function(task){
				var currentThread = task.threads[0];

				if(currentThread.bursts[0].quantum == 0) {
					currentThread.bursts.splice(0, 1);
					waitQueue.push(readyQueue.splice(0, 1)[0]);

					//En este caso no se mueve al thread a ningun lado porque es el que ocaciono el IO
				}
			});
			//E/S
			waitQueue.forEach(function(task){
				var currentThread = task.threads[0];

				if(currentThread.bursts[0].quantum == 0) {
					currentThread.bursts.splice(0, 1);
					readyQueue.push(waitQueue.splice(0, 1)[0]);

					//Mover thread al final de la threadQueue
					task.threads.shift();
					task.threads.push(currentThread);
				}
			});
			//Proceso nuevo
			newQueue.forEach(function(task){
				/* Futura implementacion de start ULT
				//Obtener el thread de menor start_time
				var firstThread = task.threads.reduce(function(prev, current){
					return (prev.start >= current.start) ? prev : current;
				});

				//Mover firstThread al primer lugar de la cola de hilos
				task.threads.splice(newQueue.indexOf(firstThread), 1);
				task.threads.unshift(firstThread);

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

			if(currentTask != undefined){
				var currentThread = currentTask.threads[0];

				if(currentThread.bursts[0] != undefined){
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

			if(currentTask != undefined){
				var currentThread = currentTask.threads[0];

				if(currentThread.bursts[0] != undefined){
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

		} while(newQueue.length != 0 || readyQueue.length != 0 || waitQueue.length != 0)


		//__results.count = time;
		console.log('Tiempo: ' + time);
		console.log(__results);

		__results.tasks = [
			{ id: 1, description: 'Programa 1', result: __results[0] },
			{ id: 2, description: 'Programa 2', result: __results[1] }
		];
		
		__results.count = time;

		//

		return __results;
	}

};