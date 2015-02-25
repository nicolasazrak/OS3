var Reflux 		= require('reflux');
var Actions		= require('../actions/Actions');


var __tasks = [

	{ id: 0, description: 'Programa 1', start: 0, bursts: [ { device: 'cpu', quantum: 3 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] },

	{ id: 1, description: 'Programa 2', start: 2, bursts: [ { device: 'cpu', quantum: 1 }, { device: 'io', quantum: 2 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ] }

];


var TasksStore = Reflux.createStore({

	init: function(){
		//Listen to changes
		Actions.addTask.listen(this.addTask);
		Actions.updateTask.listen(this.updateTask);
	},

	addTask: function(){
		var id = __tasks.length + 1;
		var task = { id: id, description: '', bursts: [ { device: 'cpu', quantum: 0 }, { device: 'io', quantum: 0 }, { device: 'cpu', quantum: 0 }, { device: 'io', quantum: 0 } ] };
		__tasks[id] = task;
		/* Update */
		this.trigger();
	},

	setTasks: function(tasks){
		__tasks = task;
		this.trigger();
	},

	updateTask: function(newTask){
		__tasks.forEach(function(task){
			if(task.id == newTask.id){
				task.description = newTask.description;
				task.bursts = newTask.bursts;
				task.start = newTask.start;	
			}
		});
		this.trigger();
	},
	
	getTasks: function(){
		return __tasks;
	}


});



module.exports = TasksStore;