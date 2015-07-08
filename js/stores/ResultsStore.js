var Reflux 		= require('reflux');
var Actions 	= require('../actions/Actions')

var TasksStore	= require('./TasksStore');

var Fifo 		= require('../algorithms/Fifo');
var RoundRobin = require('../algorithms/RoundRobin');
var SJF 		= require('../algorithms/SJF');


var __results 	= { tasks: [] };


var ResultsStore = Reflux.createStore({

	init: function(){
		Actions.confirmKLTs.listen(this.generate);
	},

	generate: function(algorithm){

		//__results = eval(algorithm).mock(TasksStore.getKLTs());

		this.trigger();

	},

	getResults: function(){
		return __results;
	}

});


module.exports = ResultsStore;
