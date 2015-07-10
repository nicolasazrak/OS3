var Reflux 		= require('reflux');
var Actions 	= require('../actions/Actions')

var TasksStore	= require('./TasksStore');

var Fake		= require('../algorithms/FakeScheduler');
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
			{ description: 'Fake', algorithm: Fake },
			{ description: 'Fifo', algorithm: Fifo },
			{ description: 'Round Robin', algorithm: RoundRobin },
			{ description: 'SJF', algorithm: SJF },
		];
	},

	generate: function(algorithm){
		__results = algorithm.schedule(TasksStore.getKLTs());
		this.trigger();
	},

	getResults: function(){
		return __results;
	}

});


module.exports = ResultsStore;
