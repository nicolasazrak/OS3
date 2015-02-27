var Reflux = require('reflux');
var Actions = require('../actions/Actions')

var __results = { tasks: [], count: 0 }; 

var ResultsStore = Reflux.createStore({

	init: function(){
		Actions.confirmTasks.listen(this.generate);
	},

	generate: function(){
		__results.tasks = [
			{ id: 1, description: 'Programa 1', result: [null, 'cpu', 'cpu', 'cpu', 'io', 'io', null, 'cpu', null, null ] },
			{ id: 2, description: 'Programa 2', result: ['cpu', 'io',  'io',  'io', null, 'cpu', 'io', null, 'io', 'cpu'] }
		];
		
		__results.count = 10;
		
		this.trigger();
	},

	getResults: function(){
		return __results;
	}

});


module.exports = ResultsStore;