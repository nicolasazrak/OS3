var Reflux 		= require('reflux');
var Actions 	= require('../actions/Actions');

var TasksStore	= require('./TasksStore');

var Fifo 		= require('../algorithms/Fifo');
var RoundRobin  = require('../algorithms/RoundRobin');
var SJF 		= require('../algorithms/SJF');

var __results 	= null;

var ResultsStore = Reflux.createStore({

	init: function(){
		Actions.confirmKLTs.listen(this.generate);
	},

	getAlgorithms: function(){
		return [
			{ description: 'Fifo', algorithm: Fifo },
			{ description: 'Round Robin', algorithm: RoundRobin },
			{ description: 'SJF', algorithm: SJF },
		];
	},

	generate: function(algorithm, options){
		var scheduler = new algorithm();
		__results = scheduler.schedule(TasksStore.getKLTs(), options);
		this.trigger();
	},

	getResults: function(){
		return __results;
	}

});


module.exports = ResultsStore;
