var Fifo 		= require('../algorithms/Fifo');
var RoundRobin  = require('../algorithms/RoundRobin');
var SJF 		= require('../algorithms/SJF');

module.exports = {
	getAlgorithms: function(){
		return [
			{ description: 'Fifo', algorithm: Fifo },
			{ description: 'Round Robin', algorithm: RoundRobin },
			{ description: 'SJF', algorithm: SJF },
		];
	}
};
