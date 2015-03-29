 //Load our function
 var fifo = require('../js/algorithms/Fifo');

describe('FifoTest', function () {
 	it("[Example] Test 1", function () {

	 	var newQueue = [
			{ id: 0, description: 'Programa 1', start: 0, threads: [{ id: 0, start: 0, bursts: [ { device: 'cpu', quantum: 3 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] }] },
			{ id: 1, description: 'Programa 2', start: 2, threads: [{ id: 1, start: 2, bursts: [ { device: 'cpu', quantum: 1 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] }] }
		];
		var result = {
			tasks: [
				{ id: 1, description: 'Programa 1', result: ["cpu","cpu","cpu","io","io","cpu","cpu","io","io","io","io","io","io","io","io",null,null,null,null,null,null,null,null,null] },
				{ id: 2, description: 'Programa 2', result: [null,null,null,"cpu",null,"io","io","cpu","cpu",null,null,null,null,null,null,"io","io","io","io","io","io","io","io",null] }
			],
			count: 24
		};
		expect(fifo.mock(newQueue)).toEqual(result);
	});
});