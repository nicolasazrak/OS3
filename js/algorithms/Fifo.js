var Common = require('./Common');

/*
Transforms: 

	[
		{ id: 0, description: 'Programa 1', start: 0, bursts: [ { device: 'cpu', quantum: 3 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] },
		{ id: 1, description: 'Programa 2', start: 2, bursts: [ { device: 'cpu', quantum: 1 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] }
	];

INTERMEDIATE: 

	[ [null, 'cpu'], ['cpu', 'io'], ['cpu', 'io'], ['io', null] ];


RETURNS:

	[
		{ id: 1, description: 'Programa 1', result: [null, 'cpu', 'cpu', 'cpu', 'io', 'io', null, 'cpu', null, null ] },
		{ id: 2, description: 'Programa 2', result: ['cpu', 'io',  'io',  'io', null, 'cpu', 'io', null, 'io', 'cpu'] }
	]



*/

'use strict';

var readyQueue = [], waitQueue = [], exitQueue = [], result = [], time = 0;

var inputMock = [
	{ id: 0, description: 'Programa 1', start: 0, bursts: [ { device: 'cpu', quantum: 3 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] },
	{ id: 1, description: 'Programa 2', start: 2, bursts: [ { device: 'cpu', quantum: 1 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] }
];

//inputMock 2.0

var inputMock2 = [
	{ id: 0, description: 'Programa 1', threads: [{ start: 0, bursts: [ { device: 'cpu', quantum: 3 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] }] },
	{ id: 1, description: 'Programa 2', threads: [{ start: 2, bursts: [ { device: 'cpu', quantum: 1 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] }] }
];
/*
	[
		{ id: 1, description: 'Programa 1', result: [null, 'ul1', 'ult1', 'ult1', 'io', 'io', null, 'ult1', null, null ] },
		{ id: 2, description: 'Programa 2', result: ['ult1', 'io',  'io',  'io', null, 'ult1', 'io', null, 'io', 'ult1'] }
	]

*/


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
		inputMock.forEach(function(){ __results.push([]); });

		do {
			//Init
			__results.forEach(function(r){ r.push(null); });

			//Reloj
			readyQueue.forEach(function(task){
				if(task.bursts[0].quantum == 0) {
					task.bursts.splice(0, 1);
					waitQueue.push(readyQueue.splice(0, 1)[0]);
				}
			});
			//E/S
			waitQueue.forEach(function(task){
				if(task.bursts[0].quantum == 0) {
					task.bursts.splice(0, 1);
					readyQueue.push(waitQueue.splice(0, 1)[0]);
				}
			});
			//Proceso nuevo
			inputMock.forEach(function(task){
				if(task.start == time) {
					console.log('Entro el programa ' + task.id);
					readyQueue.push(task);
					inputMock.splice(inputMock.indexOf(task), 1);
				}
			});


			//Procesando CPU
			var currentTask = readyQueue[0];

			if(currentTask != undefined){
				if(currentTask.bursts[0] != undefined){
					console.log('CPU: Ejecutando el programa ' + currentTask.id);

					__results[currentTask.id][time] = 'cpu';
					currentTask.bursts[0].quantum--;

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
				if(currentTask.bursts[0] != undefined){
					console.log('IO: Ejecutando el programa ' + currentTask.id);

					__results[currentTask.id][time] = 'io';
					currentTask.bursts[0].quantum--;
				} else {
					console.log('Programa ' + currentTask.id + ': Termino');
					exitQueue.push(waitQueue.splice(0, 1)[0]);
				}
			} else {
				console.log('IO: sin actividad');
			}

			time++;

		} while(readyQueue.length != 0 || waitQueue.length != 0 || inputMock.length != 0)


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