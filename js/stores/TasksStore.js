var Reflux = require('reflux');


var __tasks = [

	{ id: 1, description: 'Programa 1', start: 0, bursts: [ { device: 'cpu', quantum: 3 }, { device: 'io', quantum: 2 }, { device: 'io', quantum: 2}, { device: 'cpu', quantum: 8 } ] },

	{ id: 2, description: 'Programa 2', start: 2, bursts: [ { device: 'cpu', quantum: 1 }, { device: 'io', quantum: 2 }, { device: 'io', quantum: 2}, { device: 'cpu', quantum: 8 } ] }

];


var TasksStore = Reflux.createStore({

	init: function(){
		//Listen to changes
	},

	newTask: function(){
		var id = __tasks.length + 1;
		var task = { id: id, description: '', bursts: [ { device: 'cpu', quantum: 3 }, { device: 'io', quantum: 2 }, { device: 'io', quantum: 2}, { device: 'cpu', quantum: 8 } ] };
		__tasks[id] = task;
		/* Update */
		this.trigger();
	},

	setTasks: function(tasks){
		__tasks = task;
	},

	updateTask: function(id, task){
		task.id = id;
		__tasks[id] = task;
	},
	
	getTasks: function(){
		return __tasks;
	}


});



module.exports = TasksStore;