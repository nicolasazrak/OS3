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

var queue = [], result = [], time = 0;


module.export = function(tasks){


	do {

		Common.addTasksToQueue(queue, tasks, time);



		time++;
	} while (queue.length != 0);


};