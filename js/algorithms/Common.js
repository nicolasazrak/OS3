module.exports = function(){

	addTasksToQueue = function(queue, tasks, time){
		tasks.forEach(function (task) {
			if(task.start === time){
				queue.push(task);
			}
		});
	}

}