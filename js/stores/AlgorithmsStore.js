var Fifo 		= require('../algorithms/Fifo');
var RoundRobin  = require('../algorithms/RoundRobin');
var SJF 		= require('../algorithms/SJF');

module.exports = {
	getAlgorithms: function(){
		return [ Fifo, RoundRobin, SJF ];
	}
};
